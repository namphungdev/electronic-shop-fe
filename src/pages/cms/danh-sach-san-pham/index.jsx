import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Button, Space, Select, Tag, Modal, Pagination } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useQuery from '@/hooks/useQuery';
import { cmsTitles } from '@/services/product.service';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';
import { toast } from 'react-toastify';
const { Search } = Input;

const ContentContainer = styled.div`
height: calc(100vh - 64px);
overflow: hidden; 
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
`;

const CustomSearch = styled(Search)`
  .ant-input-search-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CustomButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTable = styled(Table)`
    height: 400px;
    overflow: auto;
    .ant-table-header {
        position: sticky;
        top: 0;
        z-index: 1;
        background: #fff;
    }
`;

const SelectWrapper = ({ label, children }) => (
  <div style={{ position: 'relative' }}>
    <label
      style={{
        position: 'absolute',
        left: '10px',
        top: '-8px',
        fontSize: '12px',
        color: '#aaa',
        pointerEvents: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: 'white',
        padding: '0 5px',
        zIndex: 1,
      }}
    >
      {label}
    </label>
    <div style={{ width: '100%' }}>{children}</div>
  </div>
);

const locale = {
  items_per_page: '/ Trang',
  jump_to: 'Đi đến',
  jump_to_confirm: 'xác nhận',
  page: '',
  prev_page: 'Trang trước',
  next_page: 'Trang sau',
  prev_5: '5 trang trước',
  next_5: '5 trang sau',
  prev_3: '3 trang trước',
  next_3: '3 trang sau',
};

const ProductListCMS = () => {
  const navigate = useNavigate()
  const [dataListProduct, setDataListProduct] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [dropdownProductCategory, setDropdownProductCategory] = useState(null);
  const [dropdownSubProCate, setDropdownSubProCate] = useState(null);
  const [dropdownProCate, setDropdownProCate] = useState(null);
  const [total, setTotal] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const {
    data: { data: productTypeList = [] } = {}
  } = useQuery({
    queryKey: `get-product-type-list`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: () =>
      cmsTitles.getDropdownProductType(),
  });

  useEffect(() => {
    if (selectedProductType) {
      cmsTitles.getDropdownProductCategory2(selectedProductType, true).then((response) => {
        setDropdownProductCategory(response?.data || []);
      }).catch((error) => {
        console.error("Failed to fetch product categories:", error);
      });
    } else {
      setDropdownProductCategory([]);
      setDropdownSubProCate([]);
    }
  }, [selectedProductType]);

  useEffect(() => {
    if (dropdownProCate) {
      cmsTitles.getDropdownSubProductCategory(dropdownProCate).then((response) => {
        setDropdownSubProCate(response?.data || []);
      }).catch((error) => {
        console.error("Failed to fetch product categories:", error);
      });
    }
  }, [dropdownProCate]);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tên danh mục sản phẩm',
      dataIndex: 'productCategoryName',
      key: 'productCategoryName',
    },
    {
      title: 'Tên danh mục sản phẩm phụ',
      dataIndex: 'subProductCategoryName',
      key: 'subProductCategoryName',
    },
    {
      title: 'Giá niêm yết',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <span>
          {price ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '') : ''}
        </span>
      ),
    },
    {
      title: 'Phần trăm giảm giá',
      dataIndex: 'percentDiscount',
      key: 'percentDiscount',
      render: (percentDiscount) => (
        <span>
          {percentDiscount !== null ? `${percentDiscount}%` : ''}
        </span>
      ),
    },
    {
      title: 'Giá được giảm',
      dataIndex: 'discountedPrice',
      key: 'discountedPrice',
      render: (discountedPrice) => (
        <span>
          {discountedPrice ? discountedPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '') : ''}
        </span>
      ),
    },
    {
      title: 'Phát hành',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished) => (
        <span>
          {isPublished ? 'Không' : 'Có'}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          color={status === 'ACTIVE' ? 'green' : 'red'}
          style={{ width: 130, textAlign: 'center', fontSize: 13, padding: '5px 0px' }}
        >
          {status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) =>
      (
        <>
          <EditOutlined style={{ marginRight: 15, cursor: 'pointer', fontSize: '25px' }} onClick={() => {
            localStorage.setItem('product-edit-slug', record.id)
            navigate(`${PATH.productListDetail}`)
          }} />
          <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '25px' }} onClick={() => showDeleteConfirm(record.id)} />
        </>
      ),
    },
  ];

  const optionStatus = [
    { value: null, label: 'Tất cả' },
    { value: 'ACTIVE', label: 'Hoạt động' },
    { value: 'INACTIVE', label: 'Không hoạt động' },
  ];

  const optionProductTypes = [
    ...productTypeList.map(productType => ({ value: productType.code, label: productType.name }))
  ];

  const optionProductCategory = dropdownProductCategory
    ? dropdownProductCategory.map(item => ({ value: item.code, label: item.name }))
    : [];

  const optionSubProductCategory =
    dropdownSubProCate
      ? dropdownSubProCate.map(item => ({ value: item.code, label: item.name }))
      : [];

  const initialParams = {
    keyword: "",
    pageIndex: 1,
    pageSize: 10,
    status: null,
    productType: null,
    productCategoryCode: null,
    subProductCategoryCode: null
  };

  const productListParam = useMemo(
    () => ({
      keyword: searchKeyword,
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      status: filterStatus,
      productType: selectedProductType,
      productCategoryCode: dropdownProCate,
      subProductCategoryCode: dropdownSubProCate?.length > 0 ? dropdownSubProCate.code : null,
    }),
    [searchKeyword, filterStatus, pagination.current, pagination.pageSize, selectedProductType, dropdownProCate, dropdownSubProCate]
  );

  const params = isFirstLoad ? initialParams : productListParam;

  const {
    data: { data: getDataProductList = [], paginate: { totalRecords } = {}, } = {},
    loading: loadingProductList,
  } = useQuery({
    queryKey: `product-page-${JSON.stringify(params)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) =>
      cmsTitles.getProductList(params, signal),
  });

  useEffect(() => {
    if (getDataProductList?.data?.length) {
      const formattedData = getDataProductList?.data?.map((item) => ({
        key: item.id,
        id: item.id,
        code: item.code,
        name: item.name,
        status: item.status,
        price: item.price,
        percentDiscount: item.percentDiscount,
        discountedPrice: item.discountedPrice,
        productCategoryName: item.productCategoryName,
        subProductCategoryName: item.subProductCategoryName
      }));
      setTotal(getDataProductList?.totalRecords)
      setDataListProduct(formattedData);
      setPagination((prev) => ({
        ...prev,
        total: totalRecords,
      }));
    } else {
      setDataListProduct([]);
      setPagination((prev) => ({
        ...prev,
        total: 0,
      }));
    }
  }, [getDataProductList, totalRecords]);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  const handleFilterStatus = (value) => {
    setFilterStatus(value);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleSearch = (value) => {
    setSearchKeyword(value);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleProductTypeChange = (value) => {
    setSelectedProductType(value);
    setDropdownProCate(null)
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleProCateChange = (value) => {
    setDropdownProCate(value)
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  }

  const handleSubProCate = (value) => {
    setDropdownSubProCate(value)
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  }

  const handleTableChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize,
    }));
  };

  const showDeleteConfirm = (slug) => {
    setSelectedProductSlug(slug);
    setIsModalOpen(true);
  };


  const handleDeleteProduct = async () => {
    setIsModalOpen(false);
    try {
      const res = await cmsTitles.deleteProductList(selectedProductSlug);

      if (res.result && res.code === 200) {
        toast.success('Xóa sản phẩm thành công');
        window.location.reload();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error('Xóa sản phẩm thất bại');
      toast.error(error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ContentContainer>
        <Space className='my-3'>
          <h3 style={{
            "color": '#696CFF',
            "font-weight": "700"
          }}>Quản lý danh sách sản phẩm</h3>
        </Space>
        <div className="py-5 px-5 mx-auto bg-white rounded-lg overflow-hidden shadow-xl ring-1 ring-gray-300 ring-opacity-50">
          <Toolbar>
            <FilterContainer>
              <CustomSearch
                placeholder="Tìm kiếm ..."
                enterButton
                style={{ maxWidth: '500px', flex: '1' }}
                onSearch={handleSearch}
              />

              <Space wrap>
                <SelectWrapper label="Trạng thái">
                  <Select
                    value={filterStatus}
                    style={{ width: 200 }}
                    options={optionStatus}
                    onChange={handleFilterStatus}
                  />
                </SelectWrapper>
              </Space>

              <Space wrap>
                <SelectWrapper label="Loại sản phẩm">
                  <Select
                    value={selectedProductType}
                    style={{ width: 200 }}
                    options={optionProductTypes}
                    onChange={handleProductTypeChange}
                  />
                </SelectWrapper>
              </Space>



              <Space wrap>
                <SelectWrapper label="Danh mục sản phẩm">
                  <Select
                    value={dropdownProCate}
                    style={{ width: 200 }}
                    options={optionProductCategory}
                    onChange={handleProCateChange}
                  />
                </SelectWrapper>
              </Space>

            </FilterContainer>
            <CustomButton onClick={() => navigate(PATH.productListAddCMS)} type="primary">
              <span style={{
                'color': '#fff',
                'font-weight': '500',
                'margin-left': '5px'
              }}>
                Thêm
              </span>
            </CustomButton>
          </Toolbar>

          <StyledTable
            columns={columns}
            dataSource={dataListProduct}
            loading={loadingProductList}
            locale={{ emptyText: 'Không có kết quả hiển thị' }}
            pagination={false}
            scroll={{ y: 300 }}
            sticky
          />

          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={total}
            onChange={handleTableChange}
            showSizeChanger
            onShowSizeChange={handleTableChange}
            locale={locale}
            showTotal={(total) => `Tổng ${total} sản phẩm`}
          />
        </div>

        <Modal
          visible={isModalOpen}
          onCancel={closeModal}
          footer={null}
          centered
        >
          <div className="text-center">
            <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Bạn có muốn xóa sản phẩm này không?</h3>
            <Button type="primary" danger onClick={handleDeleteProduct}>
              Đồng ý
            </Button>
            <Button onClick={closeModal} style={{ marginLeft: 8 }}>
              Hủy
            </Button>
          </div>
        </Modal>
      </ContentContainer>
    </>
  )
}

export default ProductListCMS

{/* <CustomSelect
                placeholder="Danh mục sản phẩm"
                style={{ width: 200 }}
                onChange={handleProCateChange}
                allowClear
              >
                {dropdownProductCategory && dropdownProductCategory.length === 0 ? (
                  <Option value={null} disabled>Chưa có dữ liệu nào</Option>
                ) : (
                  <>
                    {dropdownProductCategory && dropdownProductCategory.map((item) => (
                      <Option key={item.id} value={item.code}>
                        {item.name}
                      </Option>
                    ))}
                  </>
                )}
              </CustomSelect> */}

// <CustomSelect
//   placeholder="Danh mục sản phẩm phụ"
//   style={{ width: 200 }}
//   onChange={handleSubProCate}
//   allowClear
// >
//   <Option value={null}>Tất cả</Option>
//   {productTypeList.map((productType) => (
//     <Option key={productType.id} value={productType.code}>
//       {productType.name}
//     </Option>
//   ))}
// </CustomSelect>