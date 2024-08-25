import Breadcrumb from '@/components/Breadcrumb'
import React from 'react'

const AboutPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Breadcrumb>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Giới thiệu</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </nav>

      <div className='layout-about' style={{ margin: '30px 0'}}>
        <div className="container">
          <div className='inner'>
            <h1>GIỚI THIỆU</h1>
            <div className='inner-content'>
              <p style={{ textAlign: 'justify' }}>
                <strong>
                  1. GIỚI THIỆU
                </strong>
              </p>
              <p style={{ textAlign: 'justify' }}>
                <strong>
                  Gạch 315{' '}
                </strong>
                là thương hiệu chuyên cung cấp gạch ốp lát Taicera hàng đầu khu vực miền Nam Việt Nam. Là đại lý cấp 1 của Taicera với kho bãi chứa hàng hóa luôn sẵn sàng đáp ứng nhu cầu của khách hàng, tiết kiệm thời gian giao nhận hàng một cách nhanh chóng.
              </p>

              <p style={{ textAlign: 'justify' }}>
                Ngoài ra, Gạch 315 còn là thương hiệu chuyên cung cấp gạch ốp lát và thiết bị vệ sinh đến từ các thương hiệu như Đồng Tâm, Vietceramic, Thạch Bàn, Inax, Toto, Caesar,...
              </p>

              <p style={{ textAlign: 'justify' }}>
                <strong>
                  Gạch 315 cam kết:
                </strong>
              </p>

              <p style={{ textAlign: 'justify' }}>
                - 100% sản phẩm chính hãng.
              </p>

              <p style={{ textAlign: 'justify' }}>
                - Vận chuyển tận nơi các công trình
              </p>

              <p style={{ textAlign: 'justify' }}>
                - Giao hàng theo yêu cầu của khách hàng
              </p>

              <p style={{ textAlign: 'justify' }}>
                - Chính sách đổi trả linh hoạt
              </p>

              <p style={{ textAlign: 'justify' }}>
                <strong>
                  2. THÔNG TIN VỀ CÔNG TY
                </strong>
              </p>

              <p style={{ textAlign: 'justify' }}>
                Công ty TNHH Thương Mại & Dịch Vụ ...
              </p>

              <p style={{ textAlign: 'justify' }}>
                Địa chỉ đăng ký kinh doanh: 339 Lê Văn Lương, Phường Tân Quy, Quận 7, Thành phố Hồ Chí Minh, Việt Nam
              </p>

              <p style={{ textAlign: 'justify' }}>
                Giấy chứng nhận Đăng ký Kinh doanh số 0304905547 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 05/12/2017
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage