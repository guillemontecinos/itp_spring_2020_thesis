#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
//    #ifdef TARGET_OPENGLES
//        shader.load("shadersES2/shader");
//    #else
//        if(ofIsGLProgrammableRenderer()){
//            shader.load("shadersGL3/shader");
//        }else{
//            shader.load("shadersGL2/shader");
//        }
//    #endif
    shader.load("shadersGL3/shader-flag.vert", "shadersGL3/shader-flag.frag");
    
//    img.load("dignidad.jpg");
    video.load("ny-walk.mp4");
//    video.load("manuel-de-salas.mp4");
    
    int planeWidth = video.getWidth();
    int planeHeight = video.getHeight();
    int planeGridSize = 20;
    int planeColumns = planeWidth / planeGridSize;
    int planeRows = planeHeight / planeGridSize;
    
//    plane.set(img.getWidth(), img.getHeight(), planeColumns, planeRows);
//    plane.mapTexCoords(0, img.getHeight(), img.getWidth(), 0); //img.getHeight() is called in y-init because otherwise the texture gets rendered inverted
    plane.set(video.getWidth(), video.getHeight(), planeColumns, planeRows);
    plane.mapTexCoords(0, 0, video.getWidth(), video.getHeight()); //img.getHeight() is called in y-init because otherwise the texture gets rendered inverted
    
    video.play();
    video.setVolume(0.0);
             
}

//--------------------------------------------------------------
void ofApp::update(){
    video.update();
}

//--------------------------------------------------------------
void ofApp::draw(){
    float percentX = mouseX / (float)ofGetWidth();
    percentX = ofClamp(percentX, 0, 1);
    
//    img.getTexture().bind();
    video.getTexture().bind();
    
    shader.begin();
    
    shader.setUniform1f("u_time", ofGetElapsedTimef());
    shader.setUniform2f("u_resolution", video.getWidth(), video.getHeight());
    shader.setUniform1f("percent", percentX);
    
    float tx = ofGetWidth() / 2;
    float ty = ofGetHeight() / 2;
    ofTranslate(tx, ty);
    
    plane.draw();
    
    shader.end();
    
//    img.getTexture().unbind();
    video.getTexture().unbind();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

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
