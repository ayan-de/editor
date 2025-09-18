'use client';

import React from 'react';

export default function FileNavbar(): React.JSX.Element {
    return (
        <div className="flex items-center justify-between bg-gray-600 border-b border-gray-700 h-8 w-full px-2 text-sm text-gray-300">
            <div className="flex-1 flex justify-center">
                <span className="text-gray-400 text-xs">
                    Files will be displayed here
                </span>
            </div>

            
        </div>
    );
}