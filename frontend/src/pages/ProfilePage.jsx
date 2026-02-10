import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import {Camera, Mail, User} from "lucide-react";

function ProfilePage() {
  const {authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async(e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image});
    }
  };

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img 
                src={authUser.profilePic || "/avatar.png"}
                alt='Profile'
                className={`size-32 rounded-full object-cover border-4 transition-all duration-300 ${
                  isUpdatingProfile ? "opacity-50 blur-sm" : ""
                }`}
              />

              {isUpdatingProfile && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-dashed border-white rounded-full animate-spin border-t-transparent" />
                </div>
              )}

              <label 
                htmlFor='avatar-upload'
                className={`absolute bottom-0 right-0 bg-base-content
                            hover:scale-105 p-2 rounded-full cursor-pointer
                            transition-all duration-200
                            ${isUpdatingProfile ? "pointer-events-none opacity-50" : ""}`}
                >
                <Camera className="w-5 h-5 text-base-200" />
                <input 
                  type='file'
                  id='avatar-upload'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

    <p className='text-sm text-zinc-400'>
      {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
    </p>
          </div>











          {/* other info */}
          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className='w-4 h-4' />
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
            </div>

            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Mail className='size-4' />
                Email Address
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>

            </div>
          </div>

          <div className='mt-6 bg-base-300 rounded-xl p-6'>
            <h2 className='text-lg font-medium mb-4'>Account Informatiom</h2>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                <span>Member since</span>
                {/* <span>{authUser.createdAt?.split("T")[0]}</span> */}
                <span>{new Date(authUser.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                </span>

              </div>
              <div className='flex items-center justify-between py-2'>
                <span>Account Status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default ProfilePage