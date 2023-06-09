import { LinkDecorated } from "src/components";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { utld } from "utility-class-components";

type NavItemProps = PropsWithChildren<{
  href: string;
}>;

type NavItemLinkDecoratedProps = {
  isActive: boolean;
};

function NavItem({ href, children }: NavItemProps) {
  const hrefWithoutHash = (href.includes("#") ? href.slice(0, href.indexOf("#")) : href).split(
    "/",
  )[1];

  const pathname = usePathname();
  const isActive = pathname === hrefWithoutHash;

  return (
    <NavItemLi>
      <NavItemLinkDecorated isActive={isActive} href={href}>
        {children}
      </NavItemLinkDecorated>
    </NavItemLi>
  );
}

const NavList = utld.ul`
  flex
  items-center

  gap-8
  mr-8

  font-medium
  font-title

  mobile:(
    gap-2
    mr-2
  )
`;

const NavItemLinkDecorated = utld(LinkDecorated)<NavItemLinkDecoratedProps>`
  text-[1rem]

  mobile:text-[0.8rem]

  ${({ isActive }) =>
    isActive
      ? "text-default-light dark:text-default-dark"
      : "text-default-sub-light dark:text-default-sub-dark"}
`;

const NavItemLi = utld.li`
  flex
  items-center
`;

export { NavItem };
export default NavList;
