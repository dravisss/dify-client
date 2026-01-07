import { useState, useRef } from 'react'
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid'
import { audioToText } from '@/service'
import Toast from '@/app/components/base/toast'

interface VoiceInputProps {
  onText: (text: string) => void
}

const VoiceInput = ({ onText }: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      let mimeType = 'audio/webm;codecs=opus'
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm'
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/mp4'
        }
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = async () => {
        setIsProcessing(true)
        const blob = new Blob(chunksRef.current, { type: mimeType })

        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm'
        const formData = new FormData()
        formData.append('file', blob, `recording.${ext}`)

        try {
          const res: any = await audioToText(formData)
          if (res.error) {
            throw new Error(res.error + (res.message ? `: ${res.message}` : ''))
          }
          if (res.text) {
            onText(res.text)
          }
        } catch (e: any) {
          Toast.notify({ type: 'error', message: e.message || 'Failed to transcribe audio' })
        } finally {
          setIsProcessing(false)
          stream.getTracks().forEach(track => track.stop())
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (e) {
      Toast.notify({ type: 'error', message: 'Microphone access denied or not supported' })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div
      className={`flex items-center justify-center w-8 h-8 rounded-md cursor-pointer transition-colors ${isRecording ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'text-gray-500 hover:bg-gray-100'}`}
      onClick={handleToggle}
      title={isRecording ? 'Stop recording' : 'Start recording'}
    >
      {isProcessing
        ? (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin" />
        )
        : isRecording
          ? (
            <StopIcon className="w-5 h-5 animate-pulse" />
          )
          : (
            <MicrophoneIcon className="w-5 h-5" />
          )}
    </div>
  )
}

export default VoiceInput
