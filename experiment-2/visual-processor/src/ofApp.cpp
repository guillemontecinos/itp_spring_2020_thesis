#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    camWidth = 640;
    camHeight = 480;
    ySteps = 0;
//    stepLength = .5;
    
    // ask the video grabber for a list of attached camera devices.
    // put it into a vector of devices
    vector<ofVideoDevice> devices = vidGrabber.listDevices();
    
    // loop through and print out the devices to the console log
    for(int i = 0; i < devices.size(); i++){
        if(devices[i].bAvailable){
            ofLogNotice() << devices[i].id << ": " << devices[i].deviceName;
        }else{
            ofLogNotice() << devices[i].id << ": " << devices[i].deviceName << " - unavailable ";
        }
    }
    
    // set the ID of the camera we will use
    vidGrabber.setDeviceID(0);
    // set how fast we will grab frames from the camera
    vidGrabber.setDesiredFrameRate(30);
    // set the width and height of the camera
    vidGrabber.initGrabber(camWidth, camHeight);
    // set up our pixel object to be the same size as our camera object
    videoInverted.allocate(camWidth,camHeight, OF_PIXELS_RGB);
    videoTexture.allocate(videoInverted);
    ofSetVerticalSync(true);
//
    ofBackground(100, 100, 100); // set the background colour to dark grey
    
    // OSC listen on the given port
    ofLog() << "listening for osc messages on port " << PORT;
    receiver.setup(PORT);
    receiver.start();
    
    accumSpeed.push_back(0.0);
}

//--------------------------------------------------------------
void ofApp::update(){
    // OSC Stuff
    // hide old messages
    for(int i = 0; i < NUM_MSG_STRINGS; i++){
        if(timers[i] < ofGetElapsedTimef()){
            msgStrings[i] = "";
        }
    }

    // check for waiting messages
    while(receiver.hasWaitingMessages()){

        // get the next message
        ofxOscMessage m;
        receiver.getNextMessage(m);

        // message received event
        if(m.getAddress() == "/swipetime"){
            lastTimeStamp = m.getArgAsInt(0);
            timeStamps.push_back(lastTimeStamp);
            
            // Input Data processing
            if(timeStamps.size() > 1){
                int index = timeStamps.size() - 1;
                int delta = timeStamps[index] - timeStamps[index - 1];
                float speed = 5 / float(delta);  //scaled by 5
                deltaTimes.push_back(delta);
                speeds.push_back(speed);
                accumSpeed.push_back(accumSpeed[accumSpeed.size() - 1] + speed);
                cout << accumSpeed[accumSpeed.size() - 1] << endl;
            }
        }
    }
    
    
    
    // Video Stuff
    vidGrabber.update();
//    stepLength = ofMap(mouseY, 0, ofGetHeight(), 1, .5);
    stepLength = accumSpeed[accumSpeed.size() - 1];
    ofPixels & pixels = vidGrabber.getPixels();

    for (int x=0; x<camHeight; x++ ) { // loop through all the pixels on a line
        ofColor color = pixels.getColor(x, ySteps); // get the pixels on line ySteps
        videoInverted.setColor(x, ySteps, color);
    }

    videoTexture.loadData(videoInverted);

    if ( ySteps >= camHeight ) {
        ySteps = 0; // if we are on the bottom line of the image then start at the top again
    }
    ySteps += stepLength; // step on to the next line. increase this number to make things faster
}

//--------------------------------------------------------------
void ofApp::draw(){
    vidGrabber.draw(0, 0); // draw our plain image
    videoTexture.draw( camWidth, 0, camWidth, camHeight); // draw the video texture we have constructed
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    if(key == 'f' || key == 'F'){
        ofToggleFullscreen();
    }    
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
