import Image from "next/image";
import Header from '@/components/Header'
import Search from "@/components/Search";
import Table from "@/components/Table";
export default function Home() {
  return (
    <main>
      <Header/>
      <Search />
      <Table />
    </main>
  );
}
