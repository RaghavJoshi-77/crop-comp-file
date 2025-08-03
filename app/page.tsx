import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
<div className="flex justify-between navbar bg-base-100 shadow-xl">
  <a className="btn btn-ghost text-xl">Crop_Comp_Media</a>
  <Link href="/sign-up">
    <button className="p-4 btn bg-black text-white border-black rounded-xl">
    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
    SignUp with Google
    </button>
  </Link>
</div>
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <h2 className="text-5xl md:text-5xl font-bold text-center mb-4">
        Welcome To
      </h2>
      <h1 className="text-6xl md:text-6xl font-bold text-center mb-4">
        Crop-Comp-Media
      </h1>
      <p className="text-2xl text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, rerum.</p>
    </div>
</>
  );
}
