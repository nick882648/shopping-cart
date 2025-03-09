'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../components/Providers';
import Link from 'next/link';

export default function AccountPage() {
  const router = useRouter();
  const { user, setUser } = useUser();

  // Redirect to sign in if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push('/auth/sign-in');
    }
  }, [user, router]);

  const handleSignOut = () => {
    setUser(null);
    router.push('/');
  };

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Homepage Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-pink-600 hover:text-pink-700"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Homepage
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold leading-6 text-gray-900">Account Profile</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account settings and view your order history
            </p>
          </div>

          {/* Profile Information */}
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900">Personal Information</h4>
                <div className="mt-3 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <div className="mt-1 text-sm text-gray-900">{user.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <div className="mt-1 text-sm text-gray-900">{user.email}</div>
                  </div>
                </div>
              </div>

              {/* Order History - Placeholder */}
              <div>
                <h4 className="text-lg font-medium text-gray-900">Order History</h4>
                <div className="mt-3">
                  <p className="text-sm text-gray-500">No orders yet</p>
                </div>
              </div>

              {/* Account Actions */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Account Actions</h4>
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => router.push('/account/edit')}
                    className="inline-flex justify-center py-2 px-4 border border-pink-300 rounded-md shadow-sm text-sm font-medium text-pink-600 bg-white hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => router.push('/account/change-password')}
                    className="inline-flex justify-center py-2 px-4 border border-pink-300 rounded-md shadow-sm text-sm font-medium text-pink-600 bg-white hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 