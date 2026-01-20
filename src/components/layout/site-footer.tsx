export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Ready24</p>
          <p className="mt-2 text-sm text-neutral-700">
            خدمات احترافية سريعة منظمة وبسيطة وواضحة.
          </p>
          <p className="mt-3 text-xs text-neutral-500">Opportunity | Organized | Fast</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-neutral-900">ساعات العمل</p>
          <p className="mt-2 text-sm text-neutral-700">
            الأحد إلى الخميس: : ظهرًا : مساءً (بتوقيت السودان)
          </p>
          <p className="mt-2 text-sm text-neutral-700">
            مغلق: الجمعة والسبت والإجازات الرسمية في السودان
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-neutral-900">روابط مباشرة</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <a
                className="text-neutral-700 hover:text-neutral-950"
                href="https://wa.me/249115646893"
                target="_blank"
                rel="noreferrer"
              >
                واتساب Ready24
              </a>
            </li>
            <li>
              <a
                className="text-neutral-700 hover:text-neutral-950"
                href="https://web.facebook.com/ready24platform"
                target="_blank"
                rel="noreferrer"
              >
                فيسبوك
              </a>
            </li>
            <li>
              <a
                className="text-neutral-700 hover:text-neutral-950"
                href="https://www.linkedin.com/company/ready24platform/"
                target="_blank"
                rel="noreferrer"
              >
                لينكدإن
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
