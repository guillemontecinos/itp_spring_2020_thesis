#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    // ================= Shader =================
//    #ifdef TARGET_OPENGLES
//        shader.load("shadersES2/shader");
//    #else
//        if(ofIsGLProgrammableRenderer()){
            shader.load("shadersGL3/shader");
//        }else{
//            shader.load("shadersGL2/shader");
//        }
//    #endif
    
    video.load("gam.mp4");
    int planeWidth = video.getWidth();
    int planeHeight = video.getHeight();
    int planeGridSize = 20;
    int planeColumns = planeWidth / planeGridSize;
    int planeRows = planeHeight / planeGridSize;
    
    plane.set(video.getWidth(), video.getHeight(), planeColumns, planeRows);
    plane.mapTexCoords(0, video.getHeight(), video.getWidth(), 0); //img.getHeight() is called in y-init because otherwise the texture gets rendered inverted
    
    video.play();
    video.setVolume(0.0);
    // ================= Shader =================
    
    // ================== OSC ==================
    ofLog() << "listening for osc messages on port " << PORT;
    receiver.setup(PORT);
    receiver.start();
    // ================== OSC ==================
    
    // ============= System Control =============
    isSwiping = false;
    accumSpeed.push_back(0.0);
    lastSwipeTime = 0.0;
    stepLength = 0.0;
    // ============= System Control =============
}

//--------------------------------------------------------------
void ofApp::update(){
    // evaluate if is swiping
    if(ofGetElapsedTimef() - lastSwipeTime >= 2.5){
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
            if(timeStamps.size() > 1){ //TODO: Check this statement
                int index = timeStamps.size() - 1;
                int delta = timeStamps[index] - timeStamps[index - 1];
                float speed = 30 / float(delta);  //scaled
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
//    TODO: make transition between swipes smoother
//    TODO: make a variable that stores accumSpeed while not swiping. Need to know whats the current stepLength, and if reswipes while still coming down has to start in that point. Also can't go back to accumSpeed = 1, bacause won't allow to re animate.
    if(isSwiping){
        stepLength = 1.0 - accumSpeed[accumSpeed.size() - 1];
    }
    else{
        stepLength += .005;
    }
    stepLength = ofClamp(stepLength, 0.0, 1.0);
    cout << "stepLength: " << stepLength << endl;
// ============= System Control =============
// ================= Shader =================
//    float videoSpeed = ofMap(stepLength, 1, 0, 1, 0.9);
//    video.setSpeed(videoSpeed);
    video.update();
// ================= Shader =================
}

//--------------------------------------------------------------
void ofApp::draw(){
// ================= Shader =================
    float percentX = mouseX / (float)ofGetWidth();
        
    video.getTexture().bind();
    
    shader.begin();
    
    stepLength = ofClamp(percentX, 0, 1);
    shader.setUniform1f("u_time", ofGetElapsedTimef());
    shader.setUniform1f("percent", stepLength);
    shader.setUniform2f("u_resolution", video.getWidth(), video.getHeight());
    
    float tx = ofGetWidth() / 2;
    float ty = ofGetHeight() / 2;
    ofTranslate(tx, ty);
    
    plane.draw();
    
    shader.end();
    
    video.getTexture().unbind();
// ================= Shader =================
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
