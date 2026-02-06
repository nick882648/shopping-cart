'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-coral-600 mb-4">Kavya</h3>
            <p className="text-gray-600 mb-4">
              Premium quality women&apos;s undergarments with comfort and style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-coral-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-coral-600">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-gray-600 hover:text-coral-600">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Email: support@kavya.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Mon-Fri 9am-5pm EST</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Kavya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 