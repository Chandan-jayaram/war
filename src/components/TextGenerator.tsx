import { useState } from 'react'
import { FileText, Copy, Check, Loader2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

type TextType = 'blog' | 'email' | 'story' | 'poem'

export default function TextGenerator() {
  const [prompt, setPrompt] = useState('')
  const [textType, setTextType] = useState<TextType>('blog')
  const [generatedText, setGeneratedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const textTypes = [
    { id: 'blog' as TextType, label: 'Blog Post' },
    { id: 'email' as TextType, label: 'Email' },
    { id: 'story' as TextType, label: 'Story' },
    { id: 'poem' as TextType, label: 'Poem' },
  ]

  // Mock text generation - in production, replace with actual API call
  const generateText = async () => {
    if (!prompt.trim()) {
      return
    }

    setLoading(true)
    setGeneratedText('')

    // Simulate API call
    setTimeout(() => {
      const mockTexts: Record<TextType, string> = {
        blog: `# ${prompt}\n\nThis is a comprehensive blog post about "${prompt}". The topic is fascinating and has many aspects worth exploring. In this article, we'll dive deep into the subject matter and provide valuable insights.\n\n## Introduction\n\nThe world of ${prompt} is constantly evolving, bringing new opportunities and challenges. Understanding the fundamentals is crucial for anyone looking to make an impact in this field.\n\n## Key Points\n\n1. **Understanding the Basics**: First and foremost, it's important to grasp the core concepts.\n2. **Practical Applications**: Real-world applications demonstrate the value of this knowledge.\n3. **Future Trends**: Looking ahead, we can see exciting developments on the horizon.\n\n## Conclusion\n\nIn conclusion, ${prompt} represents a significant area of interest with tremendous potential. As we continue to explore and innovate, the possibilities are endless.`,
        email: `Subject: ${prompt}\n\nDear [Recipient],\n\nI hope this email finds you well. I'm writing to discuss ${prompt}.\n\nThis is an important topic that I believe warrants our attention. I would appreciate the opportunity to discuss this further at your earliest convenience.\n\nPlease let me know if you have any questions or would like to schedule a meeting.\n\nBest regards,\n[Your Name]`,
        story: `Once upon a time, there was a story about ${prompt}.\n\nIn a world where ${prompt} was the center of everything, our protagonist embarked on an incredible journey. The adventure began when they discovered something extraordinary related to ${prompt}.\n\nAs the story unfolded, challenges arose, but with determination and creativity, our hero overcame each obstacle. The tale reached its climax when the true nature of ${prompt} was revealed.\n\nIn the end, the journey taught valuable lessons about ${prompt}, leaving readers with a sense of wonder and inspiration.`,
        poem: `Ode to ${prompt}\n\nIn realms of thought where ${prompt} dwells,\nA story that the heart compels.\nThrough valleys deep and mountains high,\nWe seek the truth, we question why.\n\n${prompt}, a concept vast and wide,\nWhere dreams and reality collide.\nIn every verse, a new insight,\nThat makes our world more bright.\n\nSo let us celebrate this theme,\nAnd chase this wondrous dream.\nFor ${prompt} shows us the way,\nTo a brighter, better day.`,
      }

      setGeneratedText(mockTexts[textType])
      setLoading(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text">AI Text Generator</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Create compelling content with AI-powered text generation
        </p>
      </motion.div>

      <div className="space-y-6">
        <div className="glass rounded-2xl p-6 shadow-xl">
          <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
            Content Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {textTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setTextType(type.id)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  textType === type.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type.label}
              </motion.button>
            ))}
          </div>

          <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
            What would you like to generate?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., The future of artificial intelligence in healthcare..."
            className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                generateText()
              }
            }}
          />
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Press Ctrl+Enter to generate
            </p>
            <motion.button
              onClick={generateText}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  Generate Text
                </>
              )}
            </motion.button>
          </div>
        </div>

        {generatedText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Generated Content</h3>
              <motion.button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </motion.button>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-800 dark:text-gray-200">
                {generatedText}
              </pre>
            </div>
          </motion.div>
        )}

        {!generatedText && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to Write</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose a content type, enter your prompt, and let AI create amazing content for you
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}


