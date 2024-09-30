import Breadcrumb from '@/components/Breadcrumb'
import useScrollTop from '@/hooks/useScrollTop';
import React from 'react'

const AboutPage = () => {
  useScrollTop();

  return (
    <>
      {/* Breadcrumb */}
      <nav className="py-3 bg-[#f5f5f5] mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12" style={{ color: 'red' }}>
              <Breadcrumb>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Giới thiệu</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </nav>

      <div className='layout-about'>
        <div className="container">
          <div className='inner'>
            <div className='inner-content'>
              <p style={{ textAlign: 'justify' }}>
                <strong>
                  1. GIỚI THIỆU
                </strong>
              </p>
              <p style={{ textAlign: 'justify' }}>
                Với nhiều năm kinh nghiệm, Gạch 315 tự hào là đơn vị kinh doanh sản phẩm gạch ốp lát, thiết bị vệ sinh, tấm ốp nhựa, sơn nước đa dạng mẫu mã, uy tín, chất lượng,... Bằng sự tận tâm trong mọi hoạt động kinh doanh, chúng tôi cam kết phân phối các sản phẩm chính hãng cho các công trình dân dụng, dự án. Quý khách sẽ tìm thấy giải pháp ưu việt, kiến tạo nên không gian và lối sống hiện đại, đẳng cấp thượng lưu.
              </p>

              <p style={{ textAlign: 'justify' }}>
                <strong>
                  2. TẦM NHÌN
                </strong>
              </p>

              <p style={{ textAlign: 'justify' }}>
                Chúng tôi hướng tới là đơn vị hàng đầu trong lĩnh vực phân phối vật liệu xây dựng, cung ứng những sản phẩm tối ưu để nâng cao chất lượng công trình và giá trị cuộc sống.
              </p>

              <p style={{ textAlign: 'justify' }}>
                <strong>
                  3. SỨ MỆNH
                </strong>
              </p>

              <p style={{ textAlign: 'justify' }}>
                Mang đến cho khách hàng những sản phẩm giá trị khác biệt, bền vững và trải nghiệm tuyệt vời là tiêu chí quan tâm hàng đầu của chúng tôi. Chúng tôi luôn xây dựng mối quan hệ đối tác đáng tin cậy với khách hàng, nhà thầu và đối tác, đồng hành trong mọi dự án, công trình.
              </p>

              <p style={{ textAlign: 'justify' }}>
                <strong>
                  4. TRIẾT LÝ KINH DOANH
                </strong>
              </p>

              <p style={{ textAlign: 'justify' }}>
              Với phương châm “bán hàng đúng chất lượng nhà sản xuất, dịch vụ chu đáo, giá cả phải chăng”, Gạch 315 cam kết là cầu nối tin cậy, vững chắc giữa nhà sản xuất và người tiêu dùng, đáp ứng cao nhu cầu sử dụng của quý khách hàng, phù hợp với xu thế phát triển.
              </p>

              <p style={{ textAlign: 'justify' }}>
                <strong>
                  Gạch 315 cam kết:
                </strong>
              </p>

              <p style={{ textAlign: 'justify' }}>
                - 100% sản phẩm chính hãng, uy tín.
              </p>

              <p style={{ textAlign: 'justify' }}>
                - Bảo hành chính hãng
              </p>

              <p style={{ textAlign: 'justify' }}>
                - Cam kết giao hàng nhanh
              </p>

              <p style={{ textAlign: 'justify' }}>
                - Chính sách đổi trả linh hoạt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage