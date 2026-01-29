import React from 'react'
import { useStacks } from '../contexts/StacksContext.jsx'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Award,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import WalletConnect from './WalletConnect.jsx'
import NFTMinter from './NFTMinter.jsx'

const Dashboard = () => {
  const { isConnected, userData, isLoading, error } = useStacks()

  const stats = [
    {
      name: 'Total NFTs Minted',
      value: '1,234',
      change: '+12%',
      icon: Award,
      color: 'text-purple-600'
    },
    {
      name: 'Total Volume',
      value: '123.45 STX',
      change: '+8.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      name: 'Active Users',
      value: '567',
      change: '+24%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      name: 'Market Cap',
      value: '2,345 STX',
      change: '-2.1%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-stacks-blue rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Stacks NFT Minter
                </h1>
                <p className="text-sm text-gray-500">
                  Mint NFTs on Stacks Blockchain
                </p>
              </div>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-1 ${stat.color}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color.replace('text-', '').replace('-600', '')}-100 rounded-full flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Primary Action */}
          <div className="lg:col-span-2">
            <NFTMinter />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Wallet Connection</span>
                  <div className="flex items-center space-x-2">
                    {isConnected ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      isConnected ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {isConnected ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                </div>
                
                {error && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contract Info */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Contract Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Network</span>
                  <p className="font-mono text-sm text-gray-900 mt-1">
                    Stacks Mainnet
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Mint Price</span>
                  <p className="font-medium text-gray-900 mt-1">
                    0.1 STX per NFT
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Max Supply</span>
                  <p className="font-medium text-gray-900 mt-1">
                    10,000 NFTs
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="btn-secondary w-full">
                  View My NFTs
                </button>
                <button className="btn-secondary w-full">
                  Check Balance
                </button>
                <button className="btn-secondary w-full">
                  View Contract
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-500">
          <p>
            Built with ❤️ for the Stacks Competition • 
            Powered by Clarity 4 & Stacks Connect
          </p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard