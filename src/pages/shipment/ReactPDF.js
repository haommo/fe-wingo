import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import MyBarcode from './generatingCode/MyBarcode';
import dhlIcon from 'assets/images/wingo.png';
import qrCode from 'assets/images/qrCode.png';
import tick from 'assets/images/tick.png';
import Roboto from 'assets/fonts/Roboto-Regular.ttf';
import RobotoItalic from 'assets/fonts/Roboto-Italic.ttf';
import RobotoBold from 'assets/fonts/Roboto-Bold.ttf';
import RobotoBoldItalic from 'assets/fonts/Roboto-BoldItalic.ttf';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: Roboto
    },
    {
      src: RobotoBold,
      fontWeight: 'bold'
    },
    {
      src: RobotoItalic,
      fontWeight: 'normal',
      fontStyle: 'italic'
    },
    {
      src: RobotoBoldItalic,
      fontWeight: 'bold',
      fontStyle: 'italic'
    }
  ],
  format: 'truetype'
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Roboto'
  },

  section: {
    border: '1px solid black',
    margin: 10,
    width: '50%'
  },
  header: {
    display: 'flex',
    height: '70px',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0
  },
  headerTop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'bold'
  },
  headerTopTitle: {
    fontSize: '10px'
  },
  headerTopDate: {
    fontSize: '8px',
    marginTop: '8px'
  },
  headerMiddle: {
    width: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  headerMiddleText: {
    fontSize: '20px',
    color: 'white',
    fontWeight: 'bold'
  },
  headerIMG: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sender: {
    backgroundColor: '#417bd2',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '40px',
    marginBottom: '5px'
  },
  senderText: {
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold'
  },
  senderPanel: {
    display: 'flex',
    flexDirection: 'row'
  },

  senderTitles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontSize: '8px',
    width: '20%'
  },
  senderTitle: {
    marginTop: '3px',
    marginBottom: '3px'
  },
  senderContents: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '8px',
    width: '35%'
  },
  senderContent: {
    marginTop: '3px',
    marginBottom: '3px',
    marginLeft: '7px',
    fontFamily: 'Roboto'
  },
  senderEnds: {
    /*   display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', 
    justifyContent: 'flex-end', */
    fontSize: '8px',
    width: '15%'
  },
  senderEnd: {
    marginTop: '3px',
    marginBottom: '3px',
    marginLeft: '7px'
  },
  senderEndsContents: {
    /*  display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end', */
    fontSize: '8px',
    width: '30%'
  },
  senderEndContent: {
    marginTop: '3px',
    marginBottom: '3px',
    marginLeft: '7px'
  },
  Reciever: {
    backgroundColor: '#417bd2',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '40px',
    marginBottom: '5px',
    marginTop: '8px'
  },

  termtitle: {
    fontSize: '8px',
    marginLeft: '15px'
  },

  termcontent: {
    fontSize: '7.5px',
    lineHeight: '1.5px',
    marginLeft: '23px',
    marginTop: '5px'
  },

  line: {
    height: '2px',
    backgroundColor: '#ff3333',
    marginTop: '10px',
    marginBottom: '10px'
  },

  code: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '20px',
    marginLeft: '20px'
  },
  barcode: {
    width: '45%'
  },
  fontSpc: {
    textAlign: 'center',
    fontSize: '10px'
  },
  country: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '33%',
    height: '25px',
    fontWeight: 'bold'
  },

  // table stylesheet
  table: {
    flexDirection: 'row',
    marginTop: '10px',
    marginRight: '20px',
    marginLeft: '20px'
  },
  tableHeaderCol: {
    backgroundColor: '#417bd2',
    width: '100%',
    margin: '0.3px',
    paddingTop: '2px',
    paddingBottom: '2px'
  },
  tableHeaderCell: {
    width: '100%',
    fontSize: '8px',
    color: 'white',
    textAlign: 'center'
  },
  tableRow1: {
    margin: 'auto',
    width: '18%'
  },
  tableRow2: {
    margin: 'auto',
    width: '12%'
  },
  tableRow3: {
    margin: 'auto',
    width: '24%'
  },
  tableRow4: {
    margin: 'auto',
    width: '44%'
  },
  tableCol: {
    border: '1px solid #417bd2',
    margin: '0.3px'
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 8
  },
  tableColSpc: {
    border: '1px solid #417bd2',
    margin: '0.3px'
  },
  tableCellSpc: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 8,
    padding: '1px',
    marginBottom: '4px'
  },
  tableCellLast: {
    margin: 'auto',
    marginTop: 5,
    padding: '1px',
    marginBottom: '4px',
    height: '26px'
  },

  // details styleSheet
  details: {
    marginRight: '20px',
    marginLeft: '20px',
    display: 'flex',
    fontSize: '8px',
    flexDirection: 'row',
    marginTop: '10px'
  },

  // section2 stylesheets
  section2: {
    margin: 10,
    width: '50%',
    fontFamily: 'Roboto'
  }
});

export default function ReactPDF(props) {
  console.log('==========================');
  console.log(props);
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.headerTopTitle}>EXPRESS WORLDWIDE</Text>
              <Text style={styles.headerTopDate}>
                {props.shipment.created_at ? props.shipment.created_at.split('T')[0] : ''} WINGO LOGISTICS
              </Text>
            </View>
            <View style={styles.headerMiddle}>
              <Text style={styles.headerMiddleText}>WPX</Text>
            </View>
            <View style-={styles.headerIMG}>
              <Image src={dhlIcon} alt="dhl" style={{ width: 85, height: 25, marginTop: 22, marginRight: 10 }} />
            </View>
          </View>
          <View style={styles.sender}>
            <Text style={styles.senderText}>From (Senders information)</Text>
          </View>
          <View style={styles.senderPanel}>
            <View style={styles.senderTitles}>
              <Text style={styles.senderTitle}>Company:</Text>
              <Text style={styles.senderTitle}>Address:</Text>
              <Text style={styles.senderTitle}>City:</Text>
              <Text style={styles.senderTitle}>Country:</Text>
              <Text style={styles.senderTitle}>Phone:</Text>
            </View>
            <View style={styles.senderContents}>
              <Text style={styles.senderContent}>{props.shipment.sender_address ? props.shipment.sender_address.company : ''}</Text>
              <Text style={styles.senderContent}>{props.shipment.sender_address ? props.shipment.sender_address.address_first : ''}</Text>
              <Text style={styles.senderContent}>{props.shipment.sender_address ? props.shipment.sender_address.city : ''}</Text>

              <Text style={styles.senderContent}>{props.shipment.sender_address ? props.shipment.sender_address.country : ''}</Text>
              <Text style={styles.senderContent}>{props.shipment.sender_address ? props.shipment.sender_address.phone : ''}</Text>
            </View>
            <View style={styles.senderEnds}>
              <Text style={styles.senderEnd}>State:</Text>
              <Text style={styles.senderEnd}>Zip Code:</Text>
              <Text style={styles.senderEnd}>Email:</Text>
            </View>
            <View style={styles.senderEndsContents}>
              <Text style={styles.senderEndContent}>{props.shipment.sender_address ? props.shipment.sender_address.state : ''}</Text>
              <Text style={styles.senderEndContent}>{props.shipment.sender_address ? props.shipment.sender_address.zipcode : ''}</Text>
              <Text style={styles.senderEndContent}>{props.shipment.sender_address ? props.shipment.sender_address.email : ''}</Text>
            </View>
          </View>
          <View style={styles.Reciever}>
            <Text style={styles.senderText}>To (Consignees information)</Text>
          </View>
          <View style={styles.senderPanel}>
            <View style={styles.senderTitles}>
              <Text style={styles.senderTitle}>Company:</Text>
              <Text style={styles.senderTitle}>Address:</Text>
              <Text style={styles.senderTitle}>City:</Text>
              <Text style={styles.senderTitle}>Country:</Text>
              <Text style={styles.senderTitle}>Phone:</Text>
            </View>
            <View style={styles.senderContents}>
              <Text style={styles.senderContent}>{props.shipment.receiver_address ? props.shipment.receiver_address.company : ''}</Text>
              <Text style={styles.senderContent}>
                {props.shipment.receiver_address ? props.shipment.receiver_address.address_first : ''}
              </Text>
              <Text style={styles.senderContent}>{props.shipment.receiver_address ? props.shipment.receiver_address.city : ''}</Text>
              <Text style={styles.senderContent}>{props.shipment.receiver_address ? props.shipment.receiver_address.country : ''}</Text>
              <Text style={styles.senderContent}>{props.shipment.receiver_address ? props.shipment.receiver_address.phone : ''}</Text>
            </View>
            <View style={styles.senderEnds}>
              <Text style={styles.senderEnd}>State:</Text>
              <Text style={styles.senderEnd}>Zip Code:</Text>
              <Text style={styles.senderEnd}>Email:</Text>
            </View>
            <View style={styles.senderEndsContents}>
              <Text style={styles.senderEndContent}>{props.shipment.receiver_address ? props.shipment.receiver_address.state : ''}</Text>
              <Text style={styles.senderEndContent}>{props.shipment.receiver_address ? props.shipment.receiver_address.zipcode : ''}</Text>
              <Text style={styles.senderEndContent}>{props.shipment.receiver_address ? props.shipment.receiver_address.email : ''}</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.code}>
            <View style={styles.barcode}>
              <Text style={styles.fontSpc}>Service: Wingo Logistics</Text>
              <MyBarcode barcode={props.shipment.hawb ? props.shipment.hawb : '1'} />
              <Text style={styles.fontSpc}>{props.shipment?.hawb}</Text>
            </View>
            {/* <QRCodeDocument ids={}/> */}
            <Image src={qrCode} alt="dhl" style={{ width: 50, height: 50, marginRight: 10, marginLeft: 15 }} />
            <View style={styles.country}>
              <Text style={{ color: 'white' }}>{props.shipment.receiver_address ? props.shipment.receiver_address.country : ''}</Text>
            </View>
          </View>
          {/* This table view need to be updated. */}
          <View style={styles.table}>
            <View style={styles.tableRow1}>
              <View style={styles.tableHeaderCol}>
                <Text style={styles.tableHeaderCell}>Number</Text>
              </View>
              <View style={styles.tableColSpc}>
                <Text style={styles.tableCellSpc}>PCS</Text>
              </View>
              {/* {console.log(props.packageInfo)} */}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{props.packageInfo.length}</Text>
              </View>
            </View>
            <View style={styles.tableRow2}>
              <View style={styles.tableHeaderCol}>
                <Text style={styles.tableHeaderCell}>Gross</Text>
              </View>
              <View style={styles.tableColSpc}>
                <Text style={styles.tableCellSpc}>Weight</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{props.packageInfo.reduce((a, v) => (a = a + Number(v.subweight)), 0)}</Text>
              </View>
            </View>
            <View style={styles.tableRow3}>
              <View style={styles.tableHeaderCol}>
                <Text style={styles.tableHeaderCell}>Chargeable</Text>
              </View>
              <View style={styles.tableColSpc}>
                <Text style={styles.tableCellSpc}>Weight</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{props.packageInfo.reduce((a, v) => (a = a + Number(v.subcharge)), 0)}</Text>
              </View>
            </View>
            <View style={styles.tableRow4}>
              <View style={styles.tableHeaderCol}>
                <Text style={styles.tableHeaderCell}>Dimensions</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellLast}></Text>
              </View>
            </View>
          </View>
          <View style={styles.details}>
            <View style={{ width: '60%' }}>
              <Text style={{ marginBottom: '3px' }}>Description:</Text>
              <Text style={{ marginBottom: '3px' }}>Declared Value: {props.product.reduce((a, v) => (a = a + v.amount), 0)} USD</Text>
              <Text style={{ marginBottom: '3px' }}>Tax:</Text>
              <Text style={{ marginBottom: '3px' }}>Remark:</Text>
            </View>
            <View style={{ width: '40%' }}>
              <Text style={{ marginBottom: '3px' }}>Issue by carrier: Wingo Logistics</Text>
              <Text style={{ marginBottom: '3px' }}>Website: wingo.vn </Text>
              <Text style={{ marginBottom: '3px' }}>Email: hotro@wingo.vn</Text>
            </View>
          </View>
          <View
            style={{
              height: '2px',
              backgroundColor: '#417bd2',
              marginLeft: '15px',
              marginRight: '15px',
              marginTop: '15px',
              marginBottom: '15px'
            }}
          ></View>
          <View style={{ display: 'flex', flexDirection: 'row', marginRight: '20px', marginLeft: '20px' }}>
            <Text style={{ fontSize: '9px', width: '50%' }}>Chữ ký người gửi (Sender Signature)</Text>
            <Text style={{ fontSize: '9px', width: '50%' }}>Nhân viên nhận hàng (Picked up by)</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginRight: '20px', marginLeft: '20px', marginTop: '5px' }}>
            <Text style={{ fontSize: '8px', width: '50%' }}></Text>
            <Text style={{ fontSize: '8px', width: '50%' }}></Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginRight: '20px', marginLeft: '20px', marginTop: '20px' }}>
            <Text style={{ fontSize: '9px', width: '50%' }}>Date/time: / /</Text>
            <Text style={{ fontSize: '9px', width: '50%' }}>Date/time: / /</Text>
          </View>
        </View>
        <View style={styles.section2}>
          <View>
            <Text style={{ textAlign: 'center', marginTop: '5px', fontWeight: 'bold' }}>ĐIỀU KHOẢN SỬ DỤNG DỊCH VỤ</Text>
          </View>
          <Text style={{ fontSize: '7.5px', lineHeight: '1.5px', marginTop: '10px', marginBottom: '10px' }}>
            Bằng cách chấp thuận bản thỏa thuận này, người sử dụng dịch vụ đã đồng ý các điều khoản và điểu kiện vận chuyển do Công ty cổ
            phần Logistics Wingo đưa ra.
          </Text>
          <Text style={styles.termtitle}>1. Các mặt hàng không nhận vận chuyển:</Text>
          <Text style={styles.termcontent}>Các mặt hàng, tài liệu thuộc danh mục cấm lưu hành, xuất khẩu của Nhà nước Việt Nam.</Text>
          <Text style={styles.termcontent}>Hàng hóa có tính chất nguy hiểm cho con người, phương tiện chuyên chở</Text>
          <Text style={styles.termcontent}>Các mặt hàng, vật phẩm mà nước nhập khẩu cấm nhập dưới mọi hình thức</Text>
          <Text style={styles.termtitle}>2. Trách nhiệm của người gửi hàng</Text>
          <Text style={styles.termcontent}>
            Khai báo đầy đủ thông tin hàng hóa, giá trị từng mặt hàng, mục đích xuất khẩu và chịu trách nhiệm hoàn toàn về thông tin hàng
            hóa trước pháp luật.{' '}
          </Text>
          <Text style={styles.termcontent}>
            Cung cấp đầy đủ và chính xác thông tin người gửi; thông tin người nhận, đặc thù tính chất hàng hóa, đóng gói cẩn thận cho hàng
            dễ vỡ.{' '}
          </Text>
          <Text style={styles.termcontent}>
            Thanh toán đầy đủ tất cả các chi phí của lô hàng trước và sau khi vận chuyển. <br />
          </Text>
          <Text style={styles.termcontent}>
            Cung cấp các bằng chứng hư hại về hàng hóa đầy đủ khi khiếu nại: video, hình ảnh thực tế. Khiếu nại có hiệu lực trong vòng 30
            ngày
          </Text>
          <Text style={styles.termtitle}> 3. Trách nhiệm của Wingo Logistics</Text>
          <Text style={styles.termcontent}>Kiểm tra hàng hóa thực tế 100% và tính hợp pháp của hàng hóa (có quyền từ chối nhận hàng).</Text>
          <Text style={styles.termcontent}>
            Đảm bảo tính an toàn của bưu kiện (từ lúc nhận hàng – đến lúc giao hàng) <br />- Chịu trách nhiệm bồi thường thiệt hại theo mức
            quy định của công ty như sau:{' '}
          </Text>
          <Text style={styles.termcontent}>
            + Hàng hóa hư hỏng 100% - bồi thường theo giá trị Invoice khách hàng đã khai báo. Hư hỏng 1 phần, bồi thường 1 phần.
          </Text>
          <Text style={styles.termcontent}>
            + Hàng hóa mất mát, thất lạc quá 30 ngày không tìm được. Bồi thường theo dịch vụ chuyển phát quốc tế kết nối. (Không vượt quá
            2,000,000 vnđ / lô hàng và 1,000,000 vnđ / tài liệu)
          </Text>
          <Text style={styles.termcontent}>- Wingo Logistics không hoàn cước và bồi thường trong các trường hợp sau: </Text>
          <Text style={styles.termcontent}>
            + Chuyển phát chậm bởi sự bất khả kháng như: thiên tai, dịch bệnh, chiến tranh và do sự chậm trễ của người nhận hàng, do thủ tục
            hải quan nước nhập chưa được thực hiện, trường hợp quá tải, cao điểm.
          </Text>
          <Text style={styles.termcontent}>+ Hàng hóa bị các cơ quan nhà nước tại 2 đầu thu giữ, bị tịch thu tiêu hủy do vi phạm. </Text>
          <Text style={styles.termcontent}>
            + Hàng bị hư hỏng, bể vỡ do đặc tính tự nhiên. + Các thiệt hại gián tiếp hoặc những lợi ích liên đới không được thực hiện do
            việc hư hỏng, mất mác hoặc thất lạc hàng hóa{' '}
          </Text>
          <Text style={styles.termcontent}>
            + Không hỗ trợ bồi thường đối với những mặt hàng mang tính chất: phi vật thể, thuộc về tín ngưỡng, văn hóa…{' '}
          </Text>
          <Text style={styles.termcontent}>+ Quá thời hạn xử lý khiếu nại.</Text>
          <Text style={styles.termtitle}>4. Giải quyết tranh chấp</Text>
          <Text style={styles.termcontent}>
            Mọi tranh chấp phát sinh liên quan đến Thỏa thuận này sẽ được giải quyết bằng thương lượng giữa các bên trong vòng 30 ngày kể từ
            thời điểm phát sinh tranh chấp.{' '}
          </Text>
          <Text style={styles.termcontent}>
            Nếu quá thời hạn trên mà các bên không tự giải quyết được thì các bên có thể đưa việc tranh chấp giải quyết tại toà kinh tế tại
            thành phố Hồ Chí Minh. Phán quyết của toà sẽ là phán quyết cuối cùng và có hiệu lực bắt buộc thi hành đối với hai bên. Chi phí
            cho các hoạt động kiểm tra, xác minh và án phí do bên thua kiện chịu.
          </Text>

          <Text style={styles.termcontent}>
            <Image src={tick} />
            Khi bạn chấp nhận gửi hàng đồng nghĩa với việc bạn đã xác nhận rằng đã đọc, hiểu, xác nhận, chấp nhận và đồng ý tuân thủ điều
            khoản này.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
