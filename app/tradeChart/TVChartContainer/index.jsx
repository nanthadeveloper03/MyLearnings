import * as React from 'react';
import { widget } from '../../../public/static/charting_library';
import CustomDatafeed from './CustomDatafeed';

export default class TVChartContainer extends React.PureComponent {
  static defaultProps = {
    symbol: 'BTCUSDT',
    interval: 'D',
    libraryPath: '/static/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  tvWidget = null;

  constructor(props) {
    super(props);
    this.pairInfo = props.pairInfo;
    this.ref = React.createRef();
  }

  componentDidMount() {
    const datafeed = new CustomDatafeed(this.pairInfo);

    const widgetOptions = {
      symbol: this.pairInfo.streamPair,
      datafeed: datafeed,
      interval: this.props.interval,
      container: this.ref.current,
      library_path: this.props.libraryPath,
      locale: 'en',
      disabled_features: ['use_localstorage_for_settings','header_symbol_search', 'symbol_info'],
      enabled_features: ['study_templates'],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      theme:'Light'
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () => tvWidget.showNoticeDialog({
          title: 'Notification',
          body: 'TradingView Charting Library API works correctly',
          callback: () => {
            console.log('Noticed!');
          },
        }));

        button.innerHTML = 'Check API';
      });
    });
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return (
      <div ref={this.ref} className="TVChartContainer" style={{ height: '43.7vh' }}>
        <p>Chart will be rendered here</p>
      </div>
    );
  }
}