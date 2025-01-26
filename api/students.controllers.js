const student=require('./students.models.js')
const uploadData=async(req,res)=>{
    try {
            
    
            const requestData=req.body;
            // Create a new Data document
            const newData = new Data({
                name: req.body.name,
                roll:req.body.roll,
                department:req.body.department,
                year:req.body.year,
               phone:req.body.phone,
              email:req.body.email,
              event: req.body.event,
              payment: req.body.paymentURL
            });
    
            // Save the document to MongoDB
            await newData.save();
    
            // Send a success response
            res.status(201).json({
                success: true,
                message: 'Data uploaded successfully',
                data: newData,
            });
        } catch (error) {
            console.error('Error uploading data:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }