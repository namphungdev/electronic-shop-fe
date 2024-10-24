import Breadcrumb from '@/components/Breadcrumb'
import useScrollTop from '@/hooks/useScrollTop';
import React from 'react'
import { Helmet } from 'react-helmet';

const AboutPage = () => {
  useScrollTop();

  return (
    <>
      <Helmet>
        <title>Gạch 315 - Giới thiệu</title>
        <meta name="description" content="Trang chủ của Gạch 315, cung cấp gạch men giá rẻ chất lượng cao" />
        <meta name="keywords" content="Gạch 315, gạch men, gạch giá rẻ, gạch ốp lát" />
      </Helmet>

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="py-3 bg-[#f5f5f5] mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Breadcrumb>
                <Breadcrumb.Item to='/'>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Giới thiệu</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </nav>

      <section className="layout-about">
        <div className="container">
          <article className="inner">
            <header className="inner-header text-center text-xs">
              <h1>Giới thiệu về Gạch 315</h1>
            </header>

            <section>
              <strong>1. GIỚI THIỆU</strong>
              <p>
                Với nhiều năm kinh nghiệm, Gạch 315 tự hào là đơn vị kinh doanh sản phẩm gạch ốp lát, thiết bị vệ sinh, tấm ốp nhựa, sơn nước đa dạng mẫu mã, uy tín, chất lượng,... Bằng sự tận tâm trong mọi hoạt động kinh doanh, chúng tôi cam kết phân phối các sản phẩm chính hãng cho các công trình dân dụng, dự án. Quý khách sẽ tìm thấy giải pháp ưu việt, kiến tạo nên không gian và lối sống hiện đại, đẳng cấp thượng lưu.
              </p>
            </section>

            <section>
              <strong>2. TẦM NHÌN</strong>
              <p>
                Chúng tôi hướng tới là đơn vị hàng đầu trong lĩnh vực phân phối vật liệu xây dựng, cung ứng những sản phẩm tối ưu để nâng cao chất lượng công trình và giá trị cuộc sống.
              </p>
            </section>

            <section>
              <strong>3. SỨ MỆNH</strong>
              <p>
                Mang đến cho khách hàng những sản phẩm giá trị khác biệt, bền vững và trải nghiệm tuyệt vời là tiêu chí quan tâm hàng đầu của chúng tôi. Chúng tôi luôn xây dựng mối quan hệ đối tác đáng tin cậy với khách hàng, nhà thầu và đối tác, đồng hành trong mọi dự án, công trình.
              </p>
            </section>

            <section>
              <strong>4. TRIẾT LÝ KINH DOANH</strong>
              <p>
                Với phương châm “bán hàng đúng chất lượng nhà sản xuất, dịch vụ chu đáo, giá cả phải chăng”, Gạch 315 cam kết là cầu nối tin cậy, vững chắc giữa nhà sản xuất và người tiêu dùng, đáp ứng cao nhu cầu sử dụng của quý khách hàng, phù hợp với xu thế phát triển.
              </p>
            </section>

            <section>
              <strong>Gạch 315 cam kết:</strong>
              <ul>
                <li>100% sản phẩm chính hãng, uy tín.</li>
                <li>Bảo hành chính hãng</li>
                <li>Cam kết giao hàng nhanh</li>
                <li>Chính sách đổi trả linh hoạt.</li>
              </ul>
            </section>
          </article>
        </div>
      </section>
    </>
  )
}

export default AboutPage