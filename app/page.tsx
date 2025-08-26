import Head from "./_components/Head/Head";
import Menu from "./_components/Menu/Menu";
import MobileMenu from "./_components/Menu/MobileMenu";

export default function Home() {
  return (
    <>
    <div className="w-full sticky top-0 z-[10000] rastchin">
      <Head/>
      <Menu/>
    </div>
    <MobileMenu/>
    </>
  );
}
