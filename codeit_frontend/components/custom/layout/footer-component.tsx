const FOOTER_LINKS = [
  { label: "이용약관", href: "#" },
  { label: "개인정보처리방침", href: "#", strong: true },
  { label: "고객센터", href: "#" },
];

const BUSINESS_INFO = [
  [
    { label: "상호명", value: "메모잇" },
    { label: "대표자", value: "김메모" },
    { label: "사업자등록번호", value: "000-00-00000" },
    { label: "통신판매업 신고번호", value: "제2026-서울중구-0000호" },
  ],
  [
    { label: "주소", value: "서울특별시 중구 메모로 123, 4층" },
    { label: "개인정보 보호책임자", value: "김메모" },
  ],
  [
    { label: "고객센터", value: "02-000-0000 (평일 10:00~18:00)" },
    { label: "이메일", value: "help@memoit.example" },
  ],
];

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-brand">메모잇</p>

        <nav className="footer-links" aria-label="약관 및 고객센터">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={link.strong ? "footer-link font-bold" : "footer-link"}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-info">
          {BUSINESS_INFO.map((row, rowIndex) => (
            <p key={rowIndex} className="footer-info-row">
              {row.map((item) => (
                <span key={item.label}>
                  {item.label} {item.value}
                </span>
              ))}
            </p>
          ))}
        </div>

        <p className="footer-copy">© 2026 Memoit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
