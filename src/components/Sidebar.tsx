import { Image, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

type Tab = 'image' | 'text'

interface SidebarProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: 'image' as Tab, label: 'Image Generator', icon: Image },
    { id: 'text' as Tab, label: 'Text Generator', icon: FileText },
  ]

  return (
    <>
      {/* Mobile Tabs */}
      <div className="md:hidden glass border-b border-gray-200/50 dark:border-gray-700/50 p-2">
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-64 glass border-r border-gray-200/50 dark:border-gray-700/50 p-4 hidden md:block">
      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          )
        })}
      </nav>
      
      <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50">
        <h3 className="font-semibold text-sm mb-2">Features</h3>
        <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
          <li>• AI Image Generation</li>
          <li>• AI Text Generation</li>
          <li>• Real-time Preview</li>
          <li>• Export & Download</li>
        </ul>
      </div>
    </aside>
    </>
  )
}

