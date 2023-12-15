import React from 'react'

export default function Card({user}) {
    console.log(user)
  return (
  <>
<div className="address p-3">
  <div className="md:flex items-center justify-between 
     rounded-xl outline p-2">
    <div className="text-sm w-[300px]">
   
      <p><span className="font-semibold">Name:</span> {user.name}</p>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
      <p><span className="font-semibold">Phone:</span> {user.phone}</p>
      <p><span className="font-semibold">Website:</span> {user.website}</p>
    </div>
    <div className="text-sm  w-[300px]">
    
      <p><span className="font-semibold">City:</span> {user.address.city}</p>
      <p><span className="font-semibold">Street:</span> {user.address.street}</p>
      <p><span className="font-semibold">Suite:</span> {user.address.suite}</p>
      <p><span className="font-semibold">Zipcode:</span> {user.address.zipcode}</p>
    </div>
    <div className="text-sm  w-[300px]">
     
      <p><span className="font-semibold">Company Name:</span> {user.company.name}</p>
      <p><span className="font-semibold">Company Business:</span> {user.company.bs}</p>
      <p><span className="font-semibold">Company Catchphrase:</span> {user.company.catchPhrase}</p>
    </div>
  </div>
</div>

    </>
  )
}
