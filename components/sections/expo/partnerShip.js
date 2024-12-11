import React from 'react';
import styles from './AnimatedColumns.module.css';

const AnimatedColumns = () => {
  return (
    <section className="anim_sc1">
      <div className="container">
        <div className='row'>
          <div className='col-md-5 anim_bx1'>
            <img src='../assets/images/nico/animbgu.png' className='img-fluid anim_im1' />
            <div className='anim_cn1'>
              <h3 className='finter fw600 text-white'>Top 25 Crypto Exchange Partnerships</h3>
              <h5 className='finter fw400'>At this expo, we’ve partnered with the top 25 crypto exchanges, meticulously selected through in-depth research and surveys. These exchanges are categorized into three tiers—Tier 1, Tier 2, and Tier 3—reflecting their adherence to our rigorous standards for security, transparency, and user trust.         </h5>
              <div className='d-flex flex-wrap'>
                <div className='col'>
                  <h4 className='finter fw600 text-white'>60 +</h4>
                  <p className='finter fw400 text-white'>Chains</p>
                </div>
                <div className='col'>
                  <h4 className='finter fw600 text-white'>900 +</h4>
                  <p className='finter fw400 text-white'>dApps</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className={styles.Animcontainer}>
              <div className={styles.column}>
                <img src='../assets/images/nico/partiner.png' className='img-fluid' />
                <img src='../assets/images/nico/partiner.png' className='img-fluid' />
                <img src='../assets/images/nico/partiner.png' className='img-fluid' />
                <img src='../assets/images/nico/partiner.png' className='img-fluid' />
                <img src='../assets/images/nico/partiner.png' className='img-fluid' />
                {/* Duplicate the images */}
                <img src='../assets/images/nico/partiner.png' className='img-fluid' />
                <img src='../assets/images/nico/partiner.png' className='img-fluid' />
                <img src='../assets/images/nico/partiner.png' className='img-fluid' />
                <img src='../assets/images/nico/partiner.png' className='img-fluid' />
                <img src='../assets/images/nico/partiner.png' className='img-fluid' />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AnimatedColumns;
