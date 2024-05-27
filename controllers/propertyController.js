const Property = require("../models/Property");

exports.createProperty = (req, res) => {
  const { user } = req;
  if (user.userRole !== "seller") {
    return res.error(401, "User Unauthorized");
  }
  const {
    title,
    description,
    area,
    pin,
    bedrooms,
    bathrooms,
    hospitalsNearby,
    collegesNearby,
  } = req.body;

  if (
    !title ||
    !description ||
    !area ||
    !pin ||
    !bedrooms ||
    !bathrooms ||
    !hospitalsNearby ||
    !collegesNearby
  ) {
    return res.error(400, "Mandelory fields missing");
  }

  Property.createProperty(
    title,
    description,
    area,
    pin,
    bedrooms,
    bathrooms,
    hospitalsNearby,
    collegesNearby,
    user.userId
  )
    .then((propertyId) => {
      res.success(201, "Property created successfully", { propertyId });
    })
    .catch((err) => {
      res.error(500, "Internal Server Error", err);
    });
};

exports.getMyProperties = async (req, res) => {
  const { user } = req;
  if (user.userRole !== "seller") {
    return res.error(401, "User Unauthorized");
  }

  Property.getMyProperties(user.userId)
    .then((properties) => {
      res.success(200, "My Properties", properties);
    })
    .catch((err) => {
      res.error(500, "Internal Server Error", err);
    });
};

exports.updateProperty = (req, res) => {
  const { user } = req;
  if (user.userRole !== "seller") {
    return res.error(401, "User Unauthorized");
  }
  const {
    id,
    title,
    description,
    area,
    pin,
    bedrooms,
    bathrooms,
    hospitalsNearby,
    collegesNearby,
  } = req.body;

  if (
    !id ||
    !title ||
    !description ||
    !area ||
    !pin ||
    !bedrooms ||
    !bathrooms ||
    !hospitalsNearby ||
    !collegesNearby
  ) {
    return res.error(400, "Mandelory fields missing");
  }

  Property.updateProperty(
    id,
    title,
    description,
    area,
    pin,
    bedrooms,
    bathrooms,
    hospitalsNearby,
    collegesNearby,
    user.userId
  )
    .then(() => {
      res.success(200, "Property updated successfully");
    })
    .catch((err) => {
      res.error(500, "Internal Server Error", err.message);
    });
};

exports.deleteProperty = (req, res) => {
  const { user } = req;
  if (user.userRole !== "seller") {
    return res.error(401, "User Unauthorized");
  }
  const { id } = req.params;

  Property.deleteProperty(id, user.userId)
    .then(() => {
      res.success(200, "Property deleted successfully");
    })
    .catch((err) => {
      res.error(500, "Internal Server Error", err.message);
    });
};

exports.getAllProperties = (req, res) => {
  Property.getAllProperties()
    .then((properties) => {
      res.success(200, "All Properties", properties);
    })
    .catch((err) => {
      res.error(500, "Internal Server Error", err.message);
    });
};

exports.getProperty = (req, res) => {
  res.send("Get Property");
};

exports.expressInterest = (req, res) => {
  res.send("Express Interest");
};
