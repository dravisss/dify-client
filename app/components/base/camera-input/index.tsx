import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { CameraIcon } from '@heroicons/react/24/solid'
import { imageUpload } from '../image-uploader/utils'
import type { ImageFile } from '@/types/app'
import { TransferMethod } from '@/types/app'
import Toast from '@/app/components/base/toast'

interface CameraInputProps {
  onUpload: (imageFile: ImageFile) => void
  disabled?: boolean
  maxSize?: number // in MB
}

const compressImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          } else {
            reject(new Error('Canvas to Blob failed'))
          }
        }, file.type, 0.8)
      }
      img.onerror = err => reject(err)
    }
    reader.onerror = err => reject(err)
    reader.readAsDataURL(file)
  })
}

const CameraInput = ({ onUpload, disabled, maxSize = 10 }: CameraInputProps) => {
  const [isUploading, setIsUploading] = useState(false)

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0]
    if (!file) { return }

    setIsUploading(true)

    // Compress image if it's large or just always for safety
    try {
      file = await compressImage(file, 2000, 2000)
    } catch (error) {
      console.error('Compression failed', error)
      // Continue with original file if compression fails
    }

    if (maxSize && file.size > maxSize * 1024 * 1024) {
      Toast.notify({ type: 'error', message: `Image too large even after compression. Max size is ${maxSize}MB` })
      setIsUploading(false)
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const imageFile: ImageFile = {
        type: TransferMethod.local_file,
        _id: `${Date.now()}`,
        fileId: '',
        file: file!,
        url: reader.result as string,
        base64Url: reader.result as string,
        progress: 0,
      }
      onUpload(imageFile)
      imageUpload({
        file: imageFile.file,
        onProgressCallback: (progress) => {
          onUpload({ ...imageFile, progress })
        },
        onSuccessCallback: (res) => {
          onUpload({ ...imageFile, fileId: res.id, progress: 100 })
          setIsUploading(false)
        },
        onErrorCallback: () => {
          Toast.notify({ type: 'error', message: 'Failed to upload image' })
          onUpload({ ...imageFile, progress: -1 })
          setIsUploading(false)
        },
      })
    }
    reader.onerror = () => {
      Toast.notify({ type: 'error', message: 'Failed to read image' })
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      className={`relative flex items-center justify-center w-8 h-8 rounded-md transition-colors ${isUploading ? 'bg-blue-50 text-blue-500' : 'text-gray-500 hover:bg-gray-100'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      title="Take a photo"
    >
      {isUploading
        ? (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin" />
        )
        : (
          <CameraIcon className="w-5 h-5" />
        )}
      {!isUploading && !disabled && (
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          onChange={handleChange}
          onClick={e => (e.target as HTMLInputElement).value = ''}
        />
      )}
    </div>
  )
}

export default CameraInput
