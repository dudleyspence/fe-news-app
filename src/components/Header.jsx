import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header>
      <div className="leftHeader">
        <MobileNav />
        <h1>Trail Talk</h1>
      </div>
    </header>
  );
}
