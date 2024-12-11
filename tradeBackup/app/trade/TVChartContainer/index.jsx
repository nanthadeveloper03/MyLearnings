import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { widget } from '../../../public/static/charting_library';
import CustomDatafeed from './CustomDatafeed';

const TVChartContainer = (props) => {
  const { symbol = 'BTCUSDT', interval = 'D', libraryPath = '/static/charting_library/',
    chartsStorageUrl = 'https://saveload.tradingview.com', chartsStorageApiVersion = '1.1',
    clientId = 'tradingview.com', userId = 'public_user_id', fullscreen = false,
    autosize = true, studiesOverrides = {}, } = props;

  const ref = useRef(null);
  const tvWidget = useRef(null);

  // Access the theme mode from Redux using useSelector
  const isThemeDark = useSelector((state) => state.auth.isTheme === 'is_dark');

  useEffect(() => {
    const datafeed = new CustomDatafeed(props.pairInfo);

    const widgetOptions = {
      symbol: props.pairInfo.streamPair || symbol,
      datafeed: datafeed,
      interval: interval,
      container: ref.current,
      library_path: libraryPath,
      locale: 'en',
      disabled_features: ['use_localstorage_for_settings', 'header_symbol_search', 'symbol_info'],
      enabled_features: ['study_templates'],
      charts_storage_url: chartsStorageUrl,
      charts_storage_api_version: chartsStorageApiVersion,
      client_id: clientId,
      user_id: userId,
      fullscreen: fullscreen,
      autosize: true,
      studies_overrides: studiesOverrides,
      theme: isThemeDark ? 'dark' : 'light',
      backgroundColor: isThemeDark ? '#101010' : '#FFFFFF',
      toolbar_bg: isThemeDark ? '#101010' : '#FFF',
      custom_css_url: "css/style.css",
      loading_screen: {
        backgroundColor: isThemeDark ? '#101010' : '#FFFFFF', 
        foregroundColor: '#FF8300', 
      },

      overrides: {

        'paneProperties.background': isThemeDark ? '#101010' : '#FFFFFF',
        'paneProperties.vertGridProperties.color': isThemeDark ? '#1e1e1e' : '#f2f2f2',
        'paneProperties.horzGridProperties.color': isThemeDark ? '#1e1e1e' : '#f2f2f2',
        'paneProperties.crossHairProperties.color': isThemeDark ? '#1e1e1e' : '#f2f2f2',
        'scalesProperties.textColor': isThemeDark ? '#AAA' : '#555',
        'scalesProperties.lineColor': isThemeDark ? '#555' : '#AAA',
        'symbolWatermarkProperties.color': isThemeDark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)',
        'paneProperties.backgroundGradientStartColor': isThemeDark
          ? '#101010'
          : '#FFFFFF',
        'paneProperties.backgroundGradientEndColor': isThemeDark
          ? '#222'
          : '#FFFFFF',
        'paneProperties.backgroundType': 'solid',
        'tooltip.backgroundColor': isThemeDark ? '#999' : '#FFF',
        'tooltip.textColor': isThemeDark ? '#FFF' : '#000',
        'button.backgroundColor': isThemeDark ? '#333' : '#FFF',
        'button.borderColor': isThemeDark ? '#555' : '#CCC',
        'button.color': isThemeDark ? '#FFF' : '#000',
        'priceAxis.color': isThemeDark ? '#999' : '#555',
        'timeAxis.color': isThemeDark ? '#999' : '#555',
        'paneProperties.legendProperties.color': isThemeDark ? '#AAA' : '#555',

      },
    };

    tvWidget.current = new widget(widgetOptions);

    tvWidget.current.onChartReady(() => {
      tvWidget.current.headerReady().then(() => {
        const button = tvWidget.current.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () => tvWidget.current.showNoticeDialog({
          title: 'Notification',
          body: 'TradingView Charting Library API works correctly',
          callback: () => {
            console.log('Noticed!');
          },
        }));

        button.innerHTML = 'Check API';
      });
    });

    return () => {
      if (tvWidget.current !== null) {
        tvWidget.current.remove();
        tvWidget.current = null;
      }
    };
  }, [isThemeDark, props.pairInfo, symbol, interval, libraryPath, chartsStorageUrl, chartsStorageApiVersion, clientId, userId, fullscreen, autosize, studiesOverrides]);

  return (
    // <div ref={ref} className="TVChartContainer" style={{ height: '482px' }}>
    <div
      key={isThemeDark ? 'dark' : 'light'} // Force re-render on theme change
      ref={ref}
      className="TVChartContainer"
      style={{
        height: '482px',
        backgroundColor: isThemeDark ? '#222' : '#FFFFFF', // Ensure background color
      }}
    >
      <p>Chart will be rendered here</p>
    </div>
  );
};

export default TVChartContainer;
