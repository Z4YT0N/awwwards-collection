import { createClient } from "@/prismicio";
import Navbar from "./Navbar";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header>
      <Navbar settings={settings} />
    </header>
  );
}
