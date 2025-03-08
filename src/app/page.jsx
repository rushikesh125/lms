import Image from "next/image";
import Header from "./components/Header";
import { Search } from "lucide-react";
import CoursesGridView from "./components/CoursesGridView";

export default async function Home() {
  return (
    <>
      <Header />
      <section className="w-full bg-fixed bg-[url('https://i.ibb.co/qMkbqSjv/Screenshot-2025-03-07-195441.png')] h-[400px] bg-no-repeat bg-bottom bg-cover">
        <div className="flex flex-col justify-center items-center w-full h-[100%] bg-black bg-opacity-35">
        <h1 className="text-white text-xl backdrop-blur-md px-4 py-1 rounded-full font-semibold">
          All the Skills you need in one place
        </h1>
        <form className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-purple-400"  />
          <input
            type="text"
            placeholder="search for course"
            className="ps-9 text-lg rounded-full px-3 py-2 bg-white border shadow-lg outline-none w-11/12 md:w-96"
          />
        </form>
        </div>
      </section>
      <CoursesGridView />
    </>
  );
}
