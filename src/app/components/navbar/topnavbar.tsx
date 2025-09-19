'use client';

import Image from 'next/image';
import React from 'react';

export default function TopNavbar(): React.JSX.Element {
    return (
        <div className="flex items-center justify-between bg-gray-800 border-b border-gray-700 h-10 w-full px-2 text-sm text-gray-300">
            {/* Left section - Menu items */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                    <Image 
                        src="/instagram.png"
                        alt="Logo"
                        width={30}
                        height={30}
                        className="w-6 h-6"
                    />
                    <button className="px-2 py-1 hover:bg-gray-700 rounded transition-colors duration-200 cursor-pointer">
                        Run
                    </button>
                    <button className="px-2 py-1 hover:bg-gray-700 rounded transition-colors duration-200 cursor-pointer">
                        Terminal
                    </button>
                    <button className="px-2 py-1 hover:bg-gray-700 rounded transition-colors duration-200 cursor-pointer">
                        Help
                    </button>
                </div>
            </div>

            {/* Center section - Project title */}
            <div className="flex-1 flex justify-center">
                <span className="text-gray-400 text-xs">
                    Editor
                </span>
            </div>

            {/* Right section - Window controls */}
            <div className="flex items-center space-x-1">
                <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 0L0 6h12L6 0z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}