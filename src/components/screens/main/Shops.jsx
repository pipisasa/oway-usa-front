import React, { useEffect, useRef } from "react";
import Link from "next/link";
import s from "@/styles/screens/main/Shops.module.scss";
import useLogo from "@/hooks/admin/useLogo";

export default function Shops() {
  const { logos, fetchLogos } = useLogo();
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left:
          scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  return (
    <div className={`${s.shops_container} container`} data-aos="fade-up">
      <button onClick={() => handleScroll("left")} className={s.scroll_button}>
        &lt;
      </button>
      <div
        ref={scrollRef}
        className={s.shops}
        style={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        }}
      >
        {logos.map((logo) => (
          <Link
            key={logo.id}
            href={logo.link}
            target="_blank"
            style={{ scrollSnapAlign: "start" }}
          >
            <img src={logo.logo} alt={logo.name} />
          </Link>
        ))}
      </div>
      <button onClick={() => handleScroll("right")} className={s.scroll_button}>
        &gt;
      </button>
    </div>
  );
}
