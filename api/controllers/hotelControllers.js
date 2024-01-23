import Hotel from"../models/Hotel.js"

//create hotel
export const createHotel = async (req,res,next) => {
    const newHotel =new Hotel(req.body)
     try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
     } catch (err) {
        next(err) 
     }
}
 //updateHotel
export const updateHotel = async (req,res,next) => {
   try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
          req.params.id,
          {$set: req.body},
          {new:true}
      );
      res.status(200).json(updatedHotel)
   } catch (error) {
      res.status(500).json(error)
   }
}

//deleteHotel
export const deleteHotel = async (req,res,next) => {
  
   try {
      await Hotel.findByIdAndDelete(
         req.params.id
     );
     res.status(200).json("Hotel has been deleted")
  } catch (error) {
     res.status(500).json(error)
  }
}

//getHotel
export const getHotel = async (req,res,next) => {
   try {
      const hotel =  await Hotel.findById(
           req.params.id,
           
       );
       res.status(200).json(hotel)
    } catch (error) {
       res.status(500).json(error)
    }
}
//getHotels
export const getHotels = async (req,res,next) => {
   try {
      const hotels =  await Hotel.find();
       res.status(200).json(hotels)
    } catch (err) {
       next(err);
    } 

}