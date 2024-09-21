import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './style.css';
import useScrollTop from '@/hooks/useScrollTop';

const ContactPage = () => {
  useScrollTop();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên của bạn là bắt buộc'),
    email: Yup.string().required('Địa chỉ Email là bắt buộc').email('Địa chỉ Email không hợp lệ'),
    phone: Yup.string().required('Điện thoại là bắt buộc').matches(/^[0-9]+$/, 'Điện thoại chỉ chứa số').min(10, 'Điện thoại phải có ít nhất 10 chữ số'),
    enquiry: Yup.string().required('Nội dung là bắt buộc')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    console.log('Submitted Data:', data);
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="py-3 bg-[#f5f5f5] mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Breadcrumb>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Liên hệ với chúng tôi</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </nav>

      <div className='layout-contact'>
        <div className="container">
          <div className='col-12'>
            <div className='row'>
              <div className='col-lg-5 col-12'>
                <div className='contact-content'>
                  <h4>VLXD GẠCH 315</h4>
                  <div className="des_foo">Chuyên phân phối GẠCH ỐP LÁT - THIẾT BỊ VỆ SINH - TẤM ỐP NHỰA ...</div>
                  <div className='time-work'>
                    <div className='contact-item'>
                      <FontAwesomeIcon icon={faLocationDot} />
                      1151 Lê Đức Thọ, Phường 13, Quận Gò Vấp, Thành phố Hồ Chí Minh
                    </div>
                    <div className='contact-item'>
                      <FontAwesomeIcon icon={faPhone} />
                      0911 315 315
                    </div>
                    <div className='contact-item'>
                      <FontAwesomeIcon icon={faEnvelope} />
                      gach315@gmail.com
                    </div>
                  </div>
                </div>
                <div className="contact-form">
                  <h4>Liên hệ với chúng tôi</h4>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="group_contact">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <input
                            type="text"
                            placeholder="Tên của bạn*"
                            {...register('name')}
                            className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                          />
                          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <input
                            type="email"
                            placeholder="Địa chỉ Email*"
                            {...register('email')}
                            className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          <input
                            type="text"
                            placeholder="Điện thoại*"
                            {...register('phone')}
                            className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                          />
                          {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          <textarea
                            name="enquiry"
                            placeholder="Nội dung*"
                            {...register('enquiry')}
                            className={`form-control form-control-lg ${errors.enquiry ? 'is-invalid' : ''}`}
                            rows="6"
                          />
                          {errors.enquiry && <div className="invalid-feedback">{errors.enquiry.message}</div>}
                        </div>
                      </div>
                      <button className='btn-contact' type="submit">
                        <span>Gửi đi</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='col-lg-7 col-12'>
                <div className='map'>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4461396159686!2d106.6582906!3d10.8536321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529005d3ce75b%3A0xea82432377f77de7!2zVkxYRCBH4bqhY2ggMzE1!5e0!3m2!1sen!2s!4v1724317478982!5m2!1sen!2s"
                    style={{ border: 0, width: '100%', height: '100%' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage;
