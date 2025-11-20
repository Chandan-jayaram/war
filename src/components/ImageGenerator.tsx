import { useState } from 'react'
import { Download, Sparkles, Loader2, Wand2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock image generation - in production, replace with actual API call
  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setLoading(true)
    setError(null)
    setGeneratedImage(null)

    // Simulate API call
    setTimeout(() => {
      // Using a placeholder image service - replace with actual AI image API
      const imageUrl = `https://picsum.photos/512/512?random=${Date.now()}`
      setGeneratedImage(imageUrl)
      setLoading(false)
    }, 2000)
  }

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage
      link.download = `ai-generated-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text">AI Image Generator</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Transform your ideas into stunning images using advanced AI technology
        </p>
      </motion.div>

      <div className="space-y-6">
        <div className="glass rounded-2xl p-6 shadow-xl">
          <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
            Describe the image you want to generate
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic cityscape at sunset with flying cars and neon lights..."
            className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                generateImage()
              }
            }}
          />
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Press Ctrl+Enter to generate
            </p>
            <motion.button
              onClick={generateImage}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Image
                </>
              )}
            </motion.button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
        </div>

        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Generated Image</h3>
              <motion.button
                onClick={downloadImage}
                className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
            </div>
            <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
              Prompt: "{prompt}"
            </p>
          </motion.div>
        )}

        {!generatedImage && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to Create</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter a prompt above and watch AI bring your imagination to life
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}


