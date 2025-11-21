// import React from 'react'

const MarketPlace = () => {
  return (
   <div className="container mx-auto px-4 mt-12">
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-200 shadow-xl p-10 border border-green-300/40 hover:shadow-2xl transition-shadow duration-300">
    
    {/* Decorative Glow */}
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-300 opacity-30 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-400 opacity-20 rounded-full blur-3xl"></div>

    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
      
      <h1 className="text-4xl font-extrabold text-green-800 tracking-tight">
        🌿 Green Marketplace
      </h1>

      <span className="px-4 py-1 text-sm bg-green-700 text-white rounded-full shadow-md">
        Coming Soon
      </span>

      <p className="text-lg text-green-900/80 max-w-xl">
        Discover curated eco-friendly products that support your sustainable lifestyle and local communities.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-green-900 font-medium">
        <li className="flex items-center space-x-2">
          <span>✔️</span> <span>Compost bins</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>✔️</span> <span>Organic seeds</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>✔️</span> <span>Soil testing kits</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>✔️</span> <span>Smart irrigation tools</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>✔️</span> <span>Upcycled products</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>✔️</span> <span>And more eco-essentials</span>
        </li>
      </ul>

      <p className="text-green-900/75 max-w-xl">
        Perfect for farmers, gardeners, and eco-conscious users seeking tools that make sustainable living easier.
      </p>

      <button className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        Notify Me When Live
      </button>
    </div>
  </div>
</div>

  )
}

export default MarketPlace