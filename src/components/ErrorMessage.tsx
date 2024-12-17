import { PropsWithChildren } from "react";

export default function ErrorMessage({children}: PropsWithChildren) {
  return (
    <div>
      <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase rounded-md">
        {children}
      </div>
    </div>
  )
}
