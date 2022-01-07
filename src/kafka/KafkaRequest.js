import kafka from 'kafka-node'

const sendKafkaRequest = msg => {
    var Producer = kafka.Producer
    var client = new kafka.KafkaClient()
    var producer = new Producer(client)
   
    var payload = [
       {topic: 'orders-testing',messages:msg,partition:0}
   ]
   
   
   producer.on('ready',function(err,data){
       if(err) console.log("ready fun err",err)
       producer.send(payload,function(err,data){
           console.log("Sent ",data)
       })
   })
}

export default sendKafkaRequest