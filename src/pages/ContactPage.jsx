import Button from '@/components/Button';
import Field from '@/components/Field';
import { useTranslate } from '@/components/TranslateProvider';
import { useForm } from '@/hooks/useForm';
import useQuery from '@/hooks/useQuery';
import { organizationService } from '@/services/organization.service';
import { cn, regex, required } from '@/utils';
import handleError from '@/utils/handleError';
import React from 'react';
import { toast } from 'react-toastify';

const rules = {
  name: [required({ message: 'Vui lòng cho biết họ tên' })],
  email: [
    required({ message: 'Vui lòng điền email' }),
    regex('email', 'Emai chưa đúng'),
  ],
  phone: [required(), regex('phone')],
  title: [required()],
  content: [required()],
};

const ContactPage = () => {
  const { t } = useTranslate();
  const { loading, fetchData: postContactServices } = useQuery({
    enabled: false,
    queryFn: ({ params }) => organizationService.postContact(...params),
  });
  const { register, validate, form, formRef, reset } = useForm(rules);
  const onContact = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await postContactServices(form);
        toast.success(t('Đã gửi thông tin thành công'));
        reset?.();
      } catch (error) {
        handleError(error);
      }
    }
  };
  return (
    <div>
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb */}
              <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="index.html">
                    Trang chủ
                  </a>
                </li>
                <li className="breadcrumb-item active">Liên hệ</li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      {/* CONTENT */}
      <section className="pt-7 pb-12">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Heading */}
              <h3 className="mb-10 text-center">Liên hệ</h3>
            </div>
          </div>

          {/* IFRAME */}
      <div className="container mt-3 mb-12 w-3/4">
        <div className="row">
          <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.192844820119!2d106.63248457436676!3d10.79653725882382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529538a127823%3A0x94902c228651620f!2zNzdhIMSQxrDhu51uZyBUcuG6p24gVOG6pW4sIFTDom4gU8ahbiBOaMOsLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1716221897210!5m2!1svi!2s" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>

          <div className="row justify-content-between">
            <div className="col-12 col-md-4 col-xl-3">
              <aside className="mb-9 mb-md-0">
                {/* Heading */}
                <h6 className="mb-6">
                  <i className="fe fe-phone text-primary mr-4" /> Gọi cho chúng tôi:
                </h6>
                {/* Text */}
                {/* <p className="text-gray-500">
                  We're available from 10 am - 10 pm EST, 7 days a week.
                </p> */}

                <p className="mb-0">
                  <strong>Số điện thoại:</strong>
                  <br />
                  <a className="text-gray-500" href="tel:0965117729">
                    0965117729
                  </a>
                </p>
                {/* Divider */}
                <hr />
                {/* Heading */}
                <h6 className="mb-6">
                  <i className="fe fe-mail text-primary mr-4" /> Liên hệ cho chúng tôi:
                </h6>
                {/* Text */}
                {/* <p className="text-gray-500">
                  Fill out our form and we will contact you within 24 hours.
                </p> */}
                <p>
                  <strong>Email:</strong>
                  <br />
                  <a
                    className="text-gray-500"
                    href="mailto:nhumaidao2024@gmail.com"
                  >
                    nhumaidao2024@gmail.com
                  </a>
                </p>
                {/* Divider */}
                <hr />
                {/* Heading */}
                {/* <h6 className="mb-6">
                  <i className="fe fe-mail text-primary mr-4" /> Find Us:
                </h6> */}
                {/* Text */}
                {/* <p className="mb-0 text-gray-500">
                  Want to visit our Offline Stores?
                </p> */}
                {/* Button */}
                {/* <p className="mb-0">
                  <a
                    className="btn btn-link px-0 text-body"
                    href="https://www.google.com/maps/dir/10.8314999,106.773262/77a+%C4%90%C6%B0%E1%BB%9Dng+Tr%E1%BA%A7n+T%E1%BA%A5n,+T%C3%A2n+S%C6%A1n+Nh%C3%AC,+T%C3%A2n+Ph%C3%BA,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7695465,106.5855738,15.79z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x317529538a127823:0x94902c228651620f!2m2!1d106.6350595!2d10.796532?entry=ttu"
                  >
                    Go to Store Locator <i className="fe fe-arrow-right ml-2" />
                  </a>
                </p> */}
              </aside>
            </div>
            <div className="col-12 col-md-8">
              <form autoComplete="off" onSubmit={onContact} ref={formRef}>
                <Field
                  {...register('name')}
                  className="form-control form-control-sm"
                  id="contactName"
                  placeholder="Tên của bạn *"
                />
                <Field
                  {...register('email')}
                  className="form-control form-control-sm"
                  id="contactEmail"
                  placeholder="Email *"
                />
                <Field
                  {...register('phone')}
                  className="form-control form-control-sm"
                  id="contactPhone"
                  type="number"
                  placeholder="Số điện thoại *"
                />

                {/* Email */}
                

                <Field
                  {...register('content')}
                  id="contactMessage"
                  rows={5}
                  placeholder="Nội dung *"
                  classNameGroup="mb-7"
                  renderInput={({ error, _onChange, ...props }) => (
                    <textarea
                      {...props}
                      onChange={_onChange}
                      className={cn('form-control form-control-sm', {
                        'border-red-500 placeholder:text-red-500': error,
                      })}
                    />
                  )}
                />
                <Button className="normal-case" loading={loading}>
                  Gửi
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
