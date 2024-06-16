function dongho()   {
    var time = new Date();
    var gio = time.getHours();
    var phut = time.getMinutes();
    var giay = time.getSeconds();
    if (gio < 10)
        gio = "0" + gio;
    if (phut < 10)
        phut = "0" + phut;
    if (giay < 10)
        giay = "0" + giay;
    document.getElementById("time").innerHTML = "Viet Nam (GMT+7) " + gio + ":" + phut + ":" + giay;
    setTimeout("dongho()", 1000);
  }; 
  function ClickKitchen() {
    var roomElements = document.getElementsByClassName('room');
    document.getElementById('bgr_img').style.backgroundImage = "url('img/background-kitchen.jpg')";
    // Ẩn tất cả các phần tử có class 'room'
    for (var i = 0; i < roomElements.length; i++) {
      roomElements[i].style.display = 'none';
    }
    // Hiển thị phòng kitchen
    var kitchenElement = document.getElementById('kitchen');
    kitchenElement.style.display = 'block';
    
  }
  function ClickLivingRoom() {
    var roomElements = document.getElementsByClassName('room');
    document.getElementById('bgr_img').style.backgroundImage = "url('img/living-room-background.jpg')";
    // Ẩn tất cả các phần tử có class 'room'
    for (var i = 0; i < roomElements.length; i++) {
      roomElements[i].style.display = 'none';
    }
    // Hiển thị phòng living-room
    var livingRoomElement = document.getElementById('living-room');
    livingRoomElement.style.display = 'block';
  }
  function ClickBedRoom() {
    document.getElementById('bgr_img').style.backgroundImage = "url('img/bedroom.jpg')";
    var roomElements = document.getElementsByClassName('room');
    // Ẩn tất cả các phần tử có class 'room'
    for (var i = 0; i < roomElements.length; i++) {
      roomElements[i].style.display = 'none';
    }
    // Hiển thị phòng bedroom
    var bedRoomElement = document.getElementById('bedroom');
    bedRoomElement.style.display = 'block';
  }
  function ClickVD() {
    document.getElementById('bgr_img').style.backgroundImage = 'none';

    var roomElements = document.getElementsByClassName('room');
    
    // Ẩn tất cả các phần tử có class 'room'
    for (var i = 0; i < roomElements.length; i++) {
      roomElements[i].style.display = 'none';
    }
    // Hiển thị Visualize Data
    var visualizeRoomElement = document.getElementById('visualize data');
    visualizeRoomElement.style.display = 'block';
  }
  const firebaseConfig = {
    apiKey: "AIzaSyBWfuLCmEY65-V1aKIO5ws9j8zp2S7xDiI",
    authDomain: "smart-home-iot-5c4de.firebaseapp.com",
    databaseURL: "https://smart-home-iot-5c4de-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-home-iot-5c4de",
    storageBucket: "smart-home-iot-5c4de.appspot.com",
    messagingSenderId: "129455497192",
    appId: "1:129455497192:web:12cf5e59c6d9699dd90e5d"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  var nhietdoPK = document.getElementById('TemperatureLivingRoom');
  var dbReftempPK = firebase.database().ref().child('Living room/Temperature');
  var doamPK = document.getElementById('HumidityLivingRoom');
  var dbRefhumiPK = firebase.database().ref().child('Living room/Humidity');
  var gasPK = document.getElementById('GasLivingRoom');
  var dbRefgasPK = firebase.database().ref().child('Living room/Gas');
  var lampButton = document.getElementById('den1'); 

  var nhietdoPN = document.getElementById('TemperatureBedroom');
  var dbReftempPN = firebase.database().ref().child('Bedroom/Temperature');

  var gasPN = document.getElementById('GasBedroom');
  var dbRefgasPN = firebase.database().ref().child('Bedroom/Gas');

  var doamPN = document.getElementById('HumidityBedroom');
  var dbRefhumiPN = firebase.database().ref().child('Bedroom/Humidity');


  var nhietdoPB = document.getElementById('TemperatureKitchen');
  var dbReftempPB = firebase.database().ref().child('Kitchen/Temperature');
 /* dbReftempPB.set(24); */
  var gasPB = document.getElementById('GasKitchen');
  var dbRefgasPB = firebase.database().ref().child('Kitchen/Gas');
/*  dbRefgasPB.set('1.3ppm'); */
  var doamPB = document.getElementById('HumidityKitchen');
  var dbRefhumiPB = firebase.database().ref().child('Kitchen/Humidity');
 /* dbRefhumiPB.set('90%'); */

  var dbRefStateAirConditionLivingRoom = firebase.database().ref().child('Living room/Air_conditional');
  var dbRefStateLampLivingRoom = firebase.database().ref().child('Living room/Bulb');
  var dbRefStateTelevisionLivingRoom = firebase.database().ref().child('Living room/TV');

  var dbRefStateAirConditionBedroom = firebase.database().ref().child('Bedroom/Air_Conditional');
  var dbRefStateLampBedroom = firebase.database().ref().child('Bedroom/Bulb');
  var dbRefStateMusicBedroom = firebase.database().ref().child('Bedroom/Music');

  var dbRefStatePanKitchen = firebase.database().ref().child('Kitchen/Fan');
  var dbRefStateLampKitchen = firebase.database().ref().child('Kitchen/Bulb');
  var dbRefStateCaxHoodKitchen = firebase.database().ref().child('Kitchen/Hood');

  var StateAirConditionLivingRoom = "0";
  var StateLampLivingRoom = "0";
  var StateTelevisionLivingRoom = "0";

  var StateAirConditionBedroom = "0";
  var StateLampBedroom = "0";
  var StateMusicBedroom = "0";

  var StatePanKitchen = "0";
  var StateLampKitchen = "0";
  var StateCaxHoodKitchen = "0";

  dbReftempPK.on('value', snap => nhietdoPK.innerText = snap.val());
  dbRefhumiPK.on('value', snap => doamPK.innerText = snap.val());
  dbRefgasPK.on('value', snap => gasPK.innerText = snap.val());

  dbRefgasPN.on('value', snap => gasPN.innerText = snap.val());
  dbReftempPN.on('value', snap => nhietdoPN.innerText = snap.val());
  dbRefhumiPN.on('value', snap => doamPN.innerText = snap.val());

  dbRefgasPB.on('value', snap => gasPB.innerText = snap.val());
  dbReftempPB.on('value', snap => nhietdoPB.innerText = snap.val());
  dbRefhumiPB.on('value', snap => doamPB.innerText = snap.val());



  
  
  


  //Lấy dữ liệu thời gian thực từ Firebase
  function sync_Firebase() 
  {
    //Lấy dữ liệu điều hòa Livingroom
    dbRefStateAirConditionLivingRoom.on('value', function(snapshot) 
    {
        StateAirConditionLivingRoom = snapshot.val();
        console.log(StateAirConditionLivingRoom);

        if (StateAirConditionLivingRoom == "1") 
        {
          firebase.database().ref().child('Living room/Temperature').set("16")
          airConditionerSlider.value = 16;
          sliderValue.innerText = "16";
          document.getElementById('dieuhoaphongkhach').src = "img/airon.png";
        } 
        else 
        {
          firebase.database().ref().child('Living room/Temperature').set("để bé đo lại nha")
          airConditionerSlider.value = 15;
          sliderValue.innerText = "Off";
        }
    }, function(error) 
    {
        console.error('Error listening for changes in Firebase:', error);
    });

    //Lấy dữ liệu đèn Living Room
    dbRefStateLampLivingRoom.on('value', function(snapshot) 
    {
      StateLampLivingRoom = snapshot.val();
      console.log(StateLampLivingRoom);

      if (StateLampLivingRoom == "1") 
      {

        document.getElementById('denphongkhach').src = "img/lamp2.png";
        lampButton.innerText = "On";
      } 
      else 
      {
        document.getElementById('denphongkhach').src = "img/lamp1.png";
        lampButton.innerText = "Off";
      }
  }, function(error) 
  {
     console.error('Error listening for changes in Firebase:', error);
  });
  
    //Lấy dữ liệu Tivi Living Room
    dbRefStateTelevisionLivingRoom.on('value', function(snapshot) 
    {
      StateTelevisionLivingRoom = snapshot.val();
      console.log(StateTelevisionLivingRoom);

      if (StateTelevisionLivingRoom == "1") 
      {
        onTelevisionLivingRoom();
      } 
      else 
      {
        offTelevisionLivingRoom();
      }
  }, function(error) 
  {
     console.error('Error listening for changes in Firebase:', error);
  });

    //Lấy dữ liệu Điều hòa BedRoom
    dbRefStateAirConditionBedroom.on('value', function(snapshot) 
    {
      StateAirConditionBedroom = snapshot.val();
      console.log(StateAirConditionBedroom);

      if (StateAirConditionBedroom == "1") 
      {
        onairBedroom();
      } 
      else 
      {
        offairBedroom();
      }
  }, function(error) 
  {
     console.error('Error listening for changes in Firebase:', error);
  });
  
    //Lấy dữ liệu Đèn BedRoom
    dbRefStateLampBedroom.on('value', function(snapshot) 
    {
      StateLampBedroom = snapshot.val();
      console.log(StateLampBedroom);

      if (StateLampBedroom == "1") 
      {
        onLampBedroom();
      } 
      else 
      {
        offLampBedroom();
      }
  }, function(error) 
  {
     console.error('Error listening for changes in Firebase:', error);
  });

      //Lấy dữ liệu Nhạc BedRoom
      dbRefStateMusicBedroom.on('value', function(snapshot) 
      {
        StateMusicBedroom = snapshot.val();
        console.log(StateMusicBedroom);
  
        if (StateMusicBedroom == "1") 
        {
          onLullabyBedroom();
        } 
        else 
        {
          offLullabyBedroom();
        }
    }, function(error) 
    {
       console.error('Error listening for changes in Firebase:', error);
    });


    //Lấy dữ liệu Đèn Kitchen
    dbRefStateLampKitchen.on('value', function(snapshot) 
    {
      StateLampKitchen = snapshot.val();
      console.log(StateLampKitchen);

      if (StateLampKitchen == "1") 
      {
        onLampKitchen();
      } 
      else 
      {
        offLampKitchen();
      }
  }, function(error) 
  {
     console.error('Error listening for changes in Firebase:', error);
  });

    //Lấy dữ liệu Fan Kitchen
    dbRefStatePanKitchen.on('value', function(snapshot) 
    {
      StatePanKitchen = snapshot.val();
      console.log(StatePanKitchen);

      if (StatePanKitchen == "1") 
      {
        onFanKitchen();
      } 
      else 
      {
        offFanKitchen();
      }
  }, function(error) 
  {
     console.error('Error listening for changes in Firebase:', error);
  });

    //Lấy dữ liệu Máy Hút Kitchen
    dbRefStateCaxHoodKitchen.on('value', function(snapshot) 
    {
      StateCaxHoodKitchen = snapshot.val();
      console.log(StateCaxHoodKitchen);

      if (StateCaxHoodKitchen == "1") 
      {
        onCaxHoodKitchen();
      } 
      else 
      {
        offCaxHoodKitchen();
      }
  }, function(error) 
  {
     console.error('Error listening for changes in Firebase:', error);
  });

}


//SLIDER AIR CONDITIONER LIVING ROOM
var airConditionerSlider = document.getElementById('airConditionerSlider');
var sliderValue = document.getElementById('sliderValue');
var previousSliderValue = 0; // Lưu trữ giá trị trước đó của slider
// Xử lý khi slider thay đổi giá trị
airConditionerSlider.addEventListener('input', function () 
{
  var newTemperatureValue = parseInt(this.value); // Chuyển đổi giá trị sang kiểu số nguyên
  if (newTemperatureValue === 15) 
  {
    document.getElementById('dieuhoaphongkhach').src = "img/airoff.png";
    dbRefStateAirConditionLivingRoom.set("0")
    sliderValue.innerText = "Off"; // Nếu giá trị là 0, hiển thị là "Off"
    // Cập nhật giá trị "để bé đo lại nha" cho Living room Temperature khi slider ở trạng thái "off"
    firebase.database().ref().child('Living room/Temperature').set("để bé đo lại nha")
    .then(function () 
    {
      console.log("Cập nhật Living room Temperature thành công!");
    })
    .catch(function (error) 
    {
      console.error("Cập nhật Living room Temperature thất bại:", error);
    });
  } 
  else 
  {
    document.getElementById('dieuhoaphongkhach').src = "img/airon.png";
    dbRefStateAirConditionLivingRoom.set("1")
    sliderValue.innerText = newTemperatureValue; // Hiển thị giá trị trên slider
    // Cập nhật giá trị nhiệt độ lên Firebase từ 16 đến 32 khi slider không ở trạng thái "off"
    firebase.database().ref().child('Living room/Temperature').set(newTemperatureValue)
    .then(function () 
    {
      console.log("Cập nhật nhiệt độ thành công!");
    })
    .catch(function (error) 
    {
      console.error("Cập nhật nhiệt độ thất bại:", error);
    });
  }
  // Lưu trữ giá trị hiện tại của slider cho lần lặp tiếp theo
  previousSliderValue = newTemperatureValue;
});



//ONE BUTTON LAMP LIVING ROOM
function LampLivingroom() 
{
  // Lấy giá trị hiện tại của đèn từ Firebase
  dbRefStateLampLivingRoom.once('value', function(snapshot) 
  {
    var lampState = snapshot.val(); // Lấy giá trị trạng thái hiện tại của đèn
    // Đảo ngược trạng thái của đèn
    var newLampState = lampState === "0" ? "1" : "0";
    // Cập nhật giá trị mới vào Firebase
    dbRefStateLampLivingRoom.set(newLampState)
    .then(function() 
    {
      console.log("Trạng thái đèn đã được cập nhật thành công!");
      lampButton.innerText = newLampState === "1" ? "On" : "Off";
    })
    .catch(function(error) 
    {
      console.error("Lỗi khi cập nhật trạng thái đèn:", error);
    });
  });
}



function onTelevisionLivingRoom()
{
    StateTelevisionLivingRoom = "1";
    dbRefStateTelevisionLivingRoom.set(StateTelevisionLivingRoom)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });

  document.getElementById('tiviphongkhach').src = "img/TVon.png";
  document.getElementById('ontv1').classList.add("active");
}
function offTelevisionLivingRoom()
{
    StateTelevisionLivingRoom = "0";
    dbRefStateTelevisionLivingRoom.set(StateTelevisionLivingRoom)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });
  document.getElementById('tiviphongkhach').src = "img/TVoff.png";
  document.getElementById('ontv1').classList.remove("active");
}
/*-------------------------------------------------------------------------------------------*/

function onairBedroom()
{
    StateAirConditionBedroom = "1";
    dbRefStateAirConditionBedroom.set(StateAirConditionBedroom)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });
  document.getElementById('dieuhoaphongngu').src = "img/airon.png";
  document.getElementById('ondh2').classList.add("active");

}
function offairBedroom()
{
    StateAirConditionBedroom = "0";
    dbRefStateAirConditionBedroom.set(StateAirConditionBedroom)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });
  document.getElementById('dieuhoaphongngu').src = "img/airoff.png";
  document.getElementById('ondh2').classList.remove("active");

}
function onLampBedroom()
{
    StateLampBedroom = "1";
    dbRefStateLampBedroom.set(StateLampBedroom)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });

  document.getElementById('denphongngu').src = "img/lamp2.png";
  document.getElementById('onden2').classList.add("active");

}
function offLampBedroom()
{
    StateLampBedroom = "0";
    dbRefStateLampBedroom.set(StateLampBedroom)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });
  document.getElementById('denphongngu').src = "img/lamp1.png";
  document.getElementById('onden2').classList.remove("active");

}
function onLullabyBedroom()
{
    StateMusicBedroom = "1";
    dbRefStateMusicBedroom.set(StateMusicBedroom)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });

  document.getElementById('nhacphongngu').src = "img/musicon.png";
  document.getElementById('onlu2').classList.add("active");

}
function offLullabyBedroom()
{
    StateMusicBedroom = "0";
    dbRefStateMusicBedroom.set(StateMusicBedroom)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });
  document.getElementById('nhacphongngu').src = "img/musicoff.png";
  document.getElementById('onlu2').classList.remove("active");

}
/*-------------------------------------------------------------------------------------------*/

function onFanKitchen()
{
    StatePanKitchen = "1";
    dbRefStatePanKitchen.set(StatePanKitchen)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });

  document.getElementById('quatphongbep').src = "img/fan_on.png";
  document.getElementById('onquat3').classList.add("active");

}
function offFanKitchen()
{
    StatePanKitchen = "0";
    dbRefStatePanKitchen.set(StatePanKitchen)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });
  document.getElementById('quatphongbep').src = "img/fan_off.png";
  document.getElementById('onquat3').classList.remove("active");

}
function onLampKitchen()
{
    StateLampKitchen = "1";
    dbRefStateLampKitchen.set(StateLampKitchen)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });

  document.getElementById('bongdenphongbep').src = "img/bulb_on.png";
  document.getElementById('onden3').classList.add("active");

}
function offLampKitchen()
{
    StateLampKitchen = "0";
    dbRefStateLampKitchen.set(StateLampKitchen)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });
  document.getElementById('bongdenphongbep').src = "img/bulb_off.png";
  document.getElementById('onden3').classList.remove("active");

}
function onCaxHoodKitchen()
{
    StateCaxHoodKitchen = "1";
    dbRefStateCaxHoodKitchen.set(StateCaxHoodKitchen)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });

  document.getElementById('hutmuiphongbep').src = "img/extractor_hood_on.png";
  document.getElementById('onex3').classList.add("active");

}
function offCaxHoodKitchen()
{
    StateCaxHoodKitchen = "0";
    dbRefStateCaxHoodKitchen.set(StateCaxHoodKitchen)
    .then(function() {
      console.log("Cập nhật giá trị thành công!");
    })
    .catch(function(error) {
      console.error("Cập nhật giá trị thất bại:", error);
    });
  document.getElementById('hutmuiphongbep').src = "img/extractor_hood_off.png";
  document.getElementById('onex3').classList.remove("active");

}
// Lấy tất cả các nút tab
const topnavButtons = document.querySelectorAll(".topnav button");

// Lặp qua từng nút tab
topnavButtons.forEach((button) => {
    button.addEventListener("click", function () {
        // Loại bỏ lớp "active" từ tất cả các nút tab
        topnavButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Thêm lớp "active" cho nút tab đang được chọn
        button.classList.add("active");
    });
});


// Hiển thị biểu đồ Livingroom
var temperatureDataPK = [];
var humidityDataPK = [];
var gasDataPK = [];
var timeLabelsPK = [];

// Sử dụng mảng thời gian làm nhãn cho biểu đồ
var ctxPK = document.getElementById('LivingroomChart').getContext('2d');
var dataPK = {
  labels: timeLabelsPK,
  datasets: [
    {
      label: 'Temperature',
      data: temperatureDataPK,
      borderColor: 'red',
      borderWidth: 2,
      fill: false,
    },
    {
      label: 'Humidity',
      data: humidityDataPK,
      borderColor: 'blue',
      borderWidth: 2,
      fill: false,
    },
    {
      label: 'Gas',
      data: gasDataPK,
      borderColor: 'green',
      borderWidth: 2,
      fill: false,
    },
  ],
};

// Hàm cập nhật biểu đồ
function updateChartPK() {
  LivingroomChart.update();
}

// Lắng nghe dữ liệu từ Firebase và cập nhật biểu đồ
dbReftempPK.on('value', (snapshot) => {
  const time = new Date().toLocaleTimeString();
  timeLabelsPK.push(time);
  temperatureDataPK.push(snapshot.val());
  if (temperatureDataPK.length > 10) {
    temperatureDataPK.shift();
    timeLabelsPK.shift();
  }
  updateChartPK();
});

dbRefhumiPK.on('value', (snapshot) => {
  humidityDataPK.push(snapshot.val());
  if (humidityDataPK.length > 10) {
    humidityDataPK.shift();
  }
  updateChartPK();
});

dbRefgasPK.on('value', (snapshot) => {
  gasDataPK.push(snapshot.val());
  if (gasDataPK.length > 10) {
    gasDataPK.shift();
  }
  updateChartPK();
});

// Cấu hình biểu đồ
const optionsPK = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Livingroom',
      },
      
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Giá trị',
      },
    },
  },
};

const LivingroomChart = new Chart(ctxPK, {
  type: 'line',
  data: dataPK,
  options: optionsPK,
});

  



// Hiển thị biểu đồ Bedroom
var temperatureDataPN = [];
var humidityDataPN = [];
var gasDataPN = [];
var timeLabelsPN = [];

// Sử dụng mảng thời gian làm nhãn cho biểu đồ
var ctxPN = document.getElementById('BedroomChart').getContext('2d');
var dataPN = {
  labels: timeLabelsPN,
  datasets: [
    {
      label: 'Temperature',
      data: temperatureDataPN,
      borderColor: 'red',
      borderWidth: 2,
      fill: false,
    },
    {
      label: 'Humidity',
      data: humidityDataPN,
      borderColor: 'blue',
      borderWidth: 2,
      fill: false,
    },
    {
      label: 'Gas',
      data: gasDataPN,
      borderColor: 'green',
      borderWidth: 2,
      fill: false,
    },
  ],
};
// Hàm cập nhật biểu đồ
function updateChartPN() {
  BedroomChart.update();
}

// Lắng nghe dữ liệu từ Firebase và cập nhật biểu đồ
dbReftempPN.on('value', (snapshot) => {
  const time = new Date().toLocaleTimeString();
  timeLabelsPN.push(time);
  temperatureDataPN.push(snapshot.val());
  if (temperatureDataPN.length > 10) {
    temperatureDataPN.shift();
    timeLabelsPN.shift();
  }
  updateChartPN();
});

dbRefhumiPN.on('value', (snapshot) => {
  humidityDataPN.push(snapshot.val());
  if (humidityDataPN.length > 10) {
    humidityDataPN.shift();
  }
  updateChartPN();
});

dbRefgasPN.on('value', (snapshot) => {
  gasDataPN.push(snapshot.val());
  if (gasDataPN.length > 10) {
    gasDataPN.shift();
  }
  updateChartPN();
});

// Cấu hình biểu đồ
const optionsPN = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Bedroom',
      },
      
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Giá trị',
      },
    },
  },
};

const BedroomChart = new Chart(ctxPN, {
  type: 'line',
  data: dataPN,
  options: optionsPN,
});









// Hiển thị biểu đồ Kitchen 
var temperatureDataPB = [];
var humidityDataPB = [];
var gasDataPB = [];
var timeLabelsPB = [];

// Sử dụng mảng thời gian làm nhãn cho biểu đồ
var ctxPB = document.getElementById('KitchenChart').getContext('2d');
var dataPB = {
  labels: timeLabelsPB,
  datasets: [
    {
      label: 'Temperature',
      data: temperatureDataPB,
      borderColor: 'red',
      borderWidth: 2,
      fill: false,
    },
    {
      label: 'Humidity',
      data: humidityDataPB,
      borderColor: 'blue',
      borderWidth: 2,
      fill: false,
    },
    {
      label: 'Gas',
      data: gasDataPB,
      borderColor: 'green',
      borderWidth: 2,
      fill: false,
    },
  ],
};
// Hàm cập nhật biểu đồ
function updateChartPB() {
  KitchenChart.update();
}

// Lắng nghe dữ liệu từ Firebase và cập nhật biểu đồ
dbReftempPB.on('value', (snapshot) => {
  const time = new Date().toLocaleTimeString();
  timeLabelsPB.push(time);
  temperatureDataPB.push(snapshot.val());
  if (temperatureDataPB.length > 10) {
    temperatureDataPB.shift();
    timeLabelsPB.shift();
  }
  updateChartPB();
});

dbRefhumiPB.on('value', (snapshot) => {
  humidityDataPB.push(snapshot.val());
  if (humidityDataPB.length > 10) {
    humidityDataPB.shift();
  }
  updateChartPB();
});

dbRefgasPB.on('value', (snapshot) => {
  gasDataPB.push(snapshot.val());
  if (gasDataPB.length > 10) {
    gasDataPB.shift();
  }
  updateChartPB();
});

// Cấu hình biểu đồ
const optionsPB = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Kitchen',
      },
      
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Giá trị',
      },
    },
  },
};

const KitchenChart = new Chart(ctxPB, {
  type: 'line',
  data: dataPB,
  options: optionsPB,
});

  




const taskbarButtons = document.querySelectorAll(".taskbar button");
const chartContainers = document.querySelectorAll(".chart-container canvas");

