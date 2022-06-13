const { Report, Post, Comment, User } = require("../db");

const postReport = async (req, res, next) => {
  const { idOf, idUser } = req.params;
  const { reason, message } = req.body;
  try {
    if (!reason) return res.status(400).send("faltan campos obligatorios");

    const reportInPost = await Post.findByPk(idOf, { include: [User] });
    const reportInComment = reportInPost ? false : await Comment.findByPk(idOf, { include: [User] });
    const reportBy = await User.findByPk(idUser);
    
    if(!reportBy || (!reportInComment && !reportInPost)) {
      return res.status(404).send("Parametros invalidos")
    };
    
    // const owner = reportInComment ? reportInComment.dataValues.user.id : reportInPost.dataValues.user.id;

    // if(owner === reportBy.id) {
    //   return res.status(400).send("No puedes reportar tu propio contenido")
    // };

    const exist = await Report.findAll(
      reportInComment
        ? {
            where: {
              userId: idUser,
              commentId: idOf,
            },
          }
        : {
            where: {
              userId: idUser,
              postId: idOf,
            },
          }
    );
    if (exist.length) return res.status(409).send("report already submitted");

    const newReport = await Report.create({
      reason,
      message,
    });

    reportInComment
      ? reportInComment.addReport(newReport)
      : reportInPost.addReport(newReport);
    reportBy.addReport(newReport);

    res.send("reported successful");
  } catch (error) {
    next(error);
  }
};

const adminGetReports = async (req, res, next) => {
  const { idReport } = req.params;
  try {
    const getReports = idReport
      ? await Report.findByPk(idReport, {
        include: [
          {
            model: User
          },
          {
            model: Post,
            include: [User]
          }
        ]
      })
      : await Report.findAll();

    res.json(getReports);
  } catch (error) {
    next(error);
  }
};

const adminDeleteReport = async (req, res, next) => {
  const { idReport } = req.params;
  try {
    const reportDelete = await Report.destroy({
      where: {
        id: idReport,
      },
    });
    res.json({ deleted: Boolean(reportDelete) });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postReport,
  adminGetReports,
  adminDeleteReport,
};
