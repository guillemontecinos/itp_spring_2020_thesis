#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    camWidth = 1280;
    camHeight = 720;
    ySteps = 0;
    stepLength = 1;

    videoPlayer.load("ny-walk.mp4");
    videoPlayer.play();
    
    // set up our pixel object to be the same size as our camera object
    videoInverted.allocate(camWidth,camHeight, OF_PIXELS_RGB);
    videoTexture.allocate(videoInverted);
    ofSetVerticalSync(true);

//    ofBackground(100, 100, 100); // set the background colour to dark grey
    
    // OSC listen on the given port
    ofLog() << "listening for osc messages on port " << PORT;
    receiver.setup(PORT);
    receiver.start();
    
    // System control variables
    isSwiping = false;
    accumSpeed.push_back(0.0);
    lastSwipeTime = 0.0;
    lastLoopTime = 0.0;
    rampSpeed = 100.0;
}

//--------------------------------------------------------------
void ofApp::update(){
    // evaluate if is swiping
    if(ofGetElapsedTimef() - lastSwipeTime >= 1.0){
        isSwiping = false;
    }
    else{
        isSwiping = true;
    }
    cout << "isSwiping: " << isSwiping << endl;
    
// ================== OSC ==================
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
            if(timeStamps.size() > 1 && isSwiping){ //TODO: Check this statement
                int index = timeStamps.size() - 1;
                int delta = timeStamps[index] - timeStamps[index - 1];
                float speed = 30 / float(delta);  //scaled by 5
                deltaTimes.push_back(delta);
                speeds.push_back(speed);
                accumSpeed.push_back(accumSpeed[accumSpeed.size() - 1] + speed);
                cout << "accumSpeed: " << accumSpeed[accumSpeed.size() - 1] << endl;
            }
        }
        // update lastSwipeTime
        lastSwipeTime = ofGetElapsedTimef();
    }
// ================== OSC ==================
// ============= System Control =============
//    TODO: check again the logic because is calculating negative values
    if(isSwiping){
        stepLength = 1.0 - accumSpeed[accumSpeed.size() - 1];
        if(stepLength < 0){
            stepLength = 0;
        }
//        else{ }
    }
    else{
        if (accumSpeed.size() > 1) {
            accumSpeed.clear();
            accumSpeed.push_back(0.0);
        }
        if(stepLength >= 1){
            stepLength = 1;
        }
        else if(stepLength < 0){
            stepLength = 0;
        }
        else{
            // ramp to 1
            stepLength += .005;
        }
    }
    cout << "stepLength: " << stepLength << endl;
// ============= System Control =============
// ============ Video Processing ============
    videoPlayer.update();
    ofPixels & pixels = videoPlayer.getPixels();

    for (int x=0; x<camWidth; x++ ) { // loop through all the pixels on a line
        ofColor color = pixels.getColor(x, ySteps); // get the pixels on line ySteps
        videoInverted.setColor(x, ySteps, color);
    }

    videoTexture.loadData(videoInverted);

    if ( ySteps >= camHeight ) {
        ySteps = 0; // if we are on the bottom line of the image then start at the top again
    }
    ySteps += stepLength; // step on to the next line. increase this number to make things faster
// ============ Video Processing ============
    lastLoopTime = ofGetElapsedTimef();
}

//--------------------------------------------------------------
void ofApp::draw(){
//    videoPlayer.draw(0, 0);
    videoTexture.draw( 0, 0, camWidth, camHeight); // draw the video texture we have constructed
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
