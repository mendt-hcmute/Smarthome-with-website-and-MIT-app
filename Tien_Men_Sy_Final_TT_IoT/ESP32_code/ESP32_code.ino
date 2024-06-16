#include <DHT.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
//DHT set up
#define DHTPIN 32
#define DHTTYPE    DHT11
DHT dht(DHTPIN, DHTTYPE);
// Button set up
const int AIR_BTN = 15;
String AIR_STT = "0";
int AIR_PIN = 0;
const int BULB_BTN = 4;
String  BULB_STT = "0";
int BULB_PIN = 5;
const int TV_BTN = 19;
String  TV_STT = "0";
int TV_PIN = 23;
//#define WIFI_SSID "718"
//#define WIFI_PASSWORD "718@dcmk"
#define WIFI_SSID "IoT Lab"
#define WIFI_PASSWORD "IoT@123456"
#define DATABASE_URL "smart-home-iot-5c4de-default-rtdb.asia-southeast1.firebasedatabase.app"
#define API_KEY "AIzaSyBWfuLCmEY65-V1aKIO5ws9j8zp2S7xDiI"
#define USER_EMAIL "caotiensy2k3@gmail.com"
#define USER_PASSWORD "06102003s"
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
unsigned long senddataMillis = 0;
unsigned long getdataMillis = 0;
float gas_val, temp_val, humi_val, gas_per;

void setup() {
  Serial.begin(115200);
  delay(100);
  dht.begin();
  devices();
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connceting to WiFi");
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.host = DATABASE_URL;
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback;
  Firebase.reconnectWiFi(true);
  //fbdo.setBSSLBufferSize(4096 /* Rx buffer size in bytes from 512 - 16384 */, 1024 /* Tx buffer size in bytes from 512 - 16384 */);
  // Limit the size of response payload to be collected in FirebaseData
  //fbdo.setResponseSize(2048);
  Firebase.begin(&config, &auth); 
}
void devices(){
  pinMode(AIR_BTN, INPUT_PULLUP);
  pinMode(AIR_PIN, OUTPUT);
  pinMode(BULB_BTN, INPUT_PULLUP);
  pinMode(BULB_PIN, OUTPUT);
  pinMode(TV_BTN, INPUT_PULLUP);
  pinMode(TV_PIN, OUTPUT);
}
void mq_read(){
  gas_val = analogRead(34);
  gas_per = map(gas_val, 0, 4095, 0, 100);
}
void dht_read(){
  humi_val = dht.readHumidity();
  temp_val = dht.readTemperature();
  if (isnan(humi_val) || isnan(temp_val)) {
    Serial.println(F("Failed to read from DHT sensor!"));
  }
}
void loop() { 
  send_data();
  if(Firebase.ready() && (millis() - getdataMillis > 1000 || getdataMillis == 0)){
    getdataMillis = millis();
    get_stt();
  }
  check_btn();
}
void send_data(){
  if(Firebase.ready() && (millis() - senddataMillis > 2000 || senddataMillis == 0)) {
    mq_read();
    dht_read();
    senddataMillis = millis();
    Firebase.RTDB.setString(&fbdo, "/Living room/Gas", gas_per);
    Firebase.RTDB.setString(&fbdo, "/Living room/Temperature", temp_val);
    Firebase.RTDB.setString(&fbdo, "/Living room/Humidity", humi_val);
    Serial.println("Upload Done!");
  }
}
void get_stt(){
  if(Firebase.RTDB.getString(&fbdo, "/Living room/Air_conditional")) {
    AIR_STT = fbdo.stringData();
    if(AIR_STT=="1"){
      digitalWrite(AIR_PIN,HIGH);
    } else{
      digitalWrite(AIR_PIN,LOW);
    }
  }
  if(Firebase.RTDB.getString(&fbdo, "/Living room/Bulb")) {
    BULB_STT = fbdo.stringData();
    if(BULB_STT=="1"){
      digitalWrite(BULB_PIN,HIGH);
    } else{
        digitalWrite(BULB_PIN,LOW);
    }
  }
  if(Firebase.RTDB.getString(&fbdo, "/Living room/TV")) {
    TV_STT = fbdo.stringData();
    if(TV_STT=="1"){
      digitalWrite(TV_PIN,HIGH);
    } else{
        digitalWrite(TV_PIN,LOW);
    }
  }
}
void check_btn(){
  if(digitalRead(AIR_BTN)==LOW){
    delay(200);
    if(AIR_STT=="1"){
      digitalWrite(AIR_PIN,LOW);
      AIR_STT="0";
    }else{
      digitalWrite(AIR_PIN,HIGH);
      AIR_STT="1";
    }
    Firebase.RTDB.setString(&fbdo, "/Living room/Air_conditional", AIR_STT);
  }
  if(digitalRead(BULB_BTN)==LOW){
    delay(200);
    if(BULB_STT=="1"){
      digitalWrite(BULB_PIN,LOW);
      BULB_STT="0";
    }else{
      digitalWrite(BULB_PIN,HIGH);
      BULB_STT="1";
    }
    Firebase.RTDB.setString(&fbdo, "/Living room/Bulb", BULB_STT);
  }
  if(digitalRead(TV_BTN)==LOW){
    delay(200);
    if(TV_STT=="1"){
      digitalWrite(TV_PIN,LOW);
      TV_STT="0"; 
    }else{
      digitalWrite(TV_PIN,HIGH);
      TV_STT="1";
    }
    Firebase.RTDB.setString(&fbdo, "/Living room/TV", TV_STT);
  }
}