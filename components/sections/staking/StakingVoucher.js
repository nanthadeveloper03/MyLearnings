import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { apiRequest } from '@/hooks/apiCall';
import { useDispatch, useSelector } from 'react-redux';
import { voucherCoupen } from '@/store/authSlice';
import { handleCopy } from '@/util/common';
import { toast } from 'react-toastify';

const StakingVoucher = () => {
  const dispatch = useDispatch();
  const { voucher } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false)

  async function voucherLoad() {
    if (!voucher) {
      setLoading(true)
      try {
        const response = await apiRequest('/generateCoupon');

        if (response?.status) {
          setLoading(false)

          dispatch(voucherCoupen(response.data?.couponCode));
        }
      } catch (error) {
        console.error(error);
        toast.error('Internal Server Error..!')
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

  }
  // useEffect(() => {
  //   voucherLoad()
  // }, [])

  return (
    <>
      <section className='stak_ban2'>
        <div className='container'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-lg-8 col-md-7'>
              <div className='stak_cn2'>
                <h3 className='vouc_hd1'>Choose to Stake or Refer Your Friends to claim USDT!
                </h3>
              </div>
            </div>
            <div className='col-lg-4 col-md-5'>
            <div className={`stk_valbx1 ${!voucher ? "gen_valbx1" : ""}`}>
              {/* <div className='stk_valbx1'> */}
                <h6 className='w-100'>
                  Generate Voucher Code
                </h6>
                {voucher ?
                  <form className='stk_form1'>
                    <div className='stk_fd1'>
                      <p>You can easily claim your USDT, even if you’re not interested in staking or have insufficient funds! Simply refer your friends using your voucher code, and when they stake $50, you’ll unlock your reward. It’s a fantastic way to earn effortlessly!
                      </p>
                    </div>
                    <div className='form-group'>
                      <div className='input-group stk_grp flex-nowrap'>
                        <span className='input-group-addon'>Voucher</span>
                        <input type='text' value={voucher} className='form-control' />
                      </div>
                    </div>
                    <div className='form-group'>
                      <button type='button' className='btn btn-action text-white w-100' onClick={() => handleCopy(voucher)}>Copy</button>
                    </div>
                  </form> :
                  <form className='stk_form1'>
                    <div className='form-group'>
                      {loading ?
                        <button type='button' className='btn btn-action text-white w-100' disabled>Loading...</button>
                        :
                        <button type='button' className='btn btn-action text-white w-100' onClick={voucherLoad}>Generate Voucher Code</button>
                      }
                    </div>
                  </form>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StakingVoucher;
