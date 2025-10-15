import { UserProfile } from '@clerk/nextjs'

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            إدارة الحساب
          </h1>
          <p className="text-emerald-600">
            قم بتحديث معلومات حسابك وإعداداتك
          </p>
        </div>
        
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-2xl border-emerald-200",
            }
          }}
          routing="path"
          path="/user-profile"
        />
      </div>
    </div>
  )
}
