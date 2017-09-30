var trace = (session, input) => {
    
    if (session && session.conversationData && session.conversationData.enableDebugTrace) {
        session.send("TRACE | " + new Date().toISOString() + " | " + input);
    }
};


module.exports = trace;