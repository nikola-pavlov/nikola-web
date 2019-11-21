var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var Comment = require("../models/comment");
var Reply   = require("../models/reply");
var User    = require("../models/user");
var Photo   = require("../models/photo");
var middleware  = require("../public/assets/scripts/middleware");



// INDEX - Show all projects

router.get("/", function(req, res){
	var perPage = 6;
	var pageQuery = parseInt(req.query.page);
	var page = pageQuery ? pageQuery : 1;
	var noMatch = null;
	var category = req.query.category;
	var year = req.query.year;
	var searchQuery = req.query.search;
	var tech = req.query.tech;

	if(req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Project.find( { name: regex } ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
			Project.count( {name: regex } ).exec(function (err, count) {
				if(err) {
					console.log(err);
				} else {
					if(req.query.search && req.query.category) {
						Project.find( { name: regex, category: req.query.category } ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
							Project.count( {name: regex, category: req.query.category } ).exec(function (err, count) {
								if(err) {
									console.log(err);
								} else {
									if(req.query.search && req.query.category && req.query.year) {
										Project.find( { name: regex, category: req.query.category, year: req.query.year } ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
											Project.count( {name: regex, category: req.query.category, year: req.query.year } ).exec(function (err, count) {
												if(err) {
													console.log(err);
												} else {
													if(req.query.search && req.query.category && req.query.year && req.query.color) {
														Project.find( { name: regex, category: req.query.category, year: req.query.year, color: req.query.color } ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
															Project.count( {name: regex, category: req.query.category, year: req.query.year, color: req.query.color } ).exec(function (err, count) {
																if(err) {
																	console.log(err);
																} else {
																	if(req.query.search && req.query.category && req.query.year && req.query.color && req.query.views) {
																		Project.find( { name: regex, category: req.query.category, year: req.query.year, color: req.query.color } ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
																			Project.count( {name: regex, category: req.query.category, year: req.query.year, color: req.query.color } ).exec(function (err, count) {
																				if(err) {
																					console.log(err);
																				} else {
																					res.render("portfolio/portfolio", {
																						projects: allProjects,
																						current: page,
																						pages: Math.ceil(count / perPage),
																						noMatch: noMatch,
																						count: count,
																						search: req.query.search,
																						category: req.query.category,
																						year: req.query.year,
																						views: req.query.views,
																						color: req.query.color
																					});
																				}
																			});
																		});
																	} else {
																		res.render("portfolio/portfolio", {
																			projects: allProjects,
																			current: page,
																			pages: Math.ceil(count / perPage),
																			noMatch: noMatch,
																			count: count,
																			search: req.query.search,
																			category: req.query.category,
																			year: req.query.year,
																			views: false,
																			color: req.query.color
																		});
																	}
																}
															});
														});
													} else {
														if(req.query.search && req.query.category && req.query.year && req.query.views) {
															Project.find( { name: regex, category: req.query.category, year: req.query.year } ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
																Project.count( {name: regex, category: req.query.category, year: req.query.year } ).exec(function (err, count) {
																	if(err) {
																		console.log(err);
																	} else {
																		res.render("portfolio/portfolio", {
																			projects: allProjects,
																			current: page,
																			pages: Math.ceil(count / perPage),
																			noMatch: noMatch,
																			count: count,
																			search: req.query.search,
																			category: req.query.category,
																			year: req.query.year,
																			views: req.query.views,
																			color: false
																		});
																	}
																});
															});
														} else {
															res.render("portfolio/portfolio", {
																projects: allProjects,
																current: page,
																pages: Math.ceil(count / perPage),
																noMatch: noMatch,
																count: count,
																search: req.query.search,
																category: req.query.category,
																year: req.query.year,
																views: false,
																color: false
															});
														}
													}
												}
											});
});
} else {
	if(req.query.search && req.query.category && req.query.color) {
		Project.find( { name: regex, category: req.query.category, color: req.query.color } ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
			Project.count( {name: regex, category: req.query.category, color: req.query.color } ).exec(function (err, count) {
				if(err) {
					console.log(err);
				} else {
					if(req.query.search && req.query.category && req.query.color && req.query.views) {
						Project.find( { name: regex, category: req.query.category, color: req.query.color } ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
							Project.count( {name: regex, category: req.query.category, color: req.query.color } ).exec(function (err, count) {
								if(err) {
									console.log(err);
								} else {
									res.render("portfolio/portfolio", {
										projects: allProjects,
										current: page,
										pages: Math.ceil(count / perPage),
										noMatch: noMatch,
										count: count,
										search: req.query.search,
										category: req.query.category,
										year: false,
										views: req.query.views,
										color: req.query.color
									});
								}
							});
						});
					} else {
						res.render("portfolio/portfolio", {
							projects: allProjects,
							current: page,
							pages: Math.ceil(count / perPage),
							noMatch: noMatch,
							count: count,
							search: req.query.search,
							category: req.query.category,
							year: false,
							views: false,
							color: req.query.color
						});
					}
				}
			});
		});
	} else {
		if(req.query.search && req.query.category && req.query.views) {
			Project.find( { name: regex, category: req.query.category } ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
				Project.count( {name: regex, category: req.query.category } ).exec(function (err, count) {
					if(err) {
						console.log(err);
					} else {
						res.render("portfolio/portfolio", {
							projects: allProjects,
							current: page,
							pages: Math.ceil(count / perPage),
							noMatch: noMatch,
							count: count,
							search: req.query.search,
							category: req.query.category,
							year: false,
							views: req.query.views,
							color: false
						});
					}
				});
			});
		} else {
			res.render("portfolio/portfolio", {
				projects: allProjects,
				current: page,
				pages: Math.ceil(count / perPage),
				noMatch: noMatch,
				count: count,
				search: req.query.search,
				category: req.query.category,
				year: false,
				views: false,
				color: false
			});
		}
	}
}
}
});
});
} else {
	if(req.query.search && req.query.year) {
		Project.find( { name: regex, year: req.query.year } ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
			Project.count( {name: regex, year: req.query.year } ).exec(function (err, count) {
				if(err) {
					console.log(err);
				} else {
					if(req.query.search && req.query.year && req.query.color) {
						Project.find( { name: regex, year: req.query.year, color: req.query.color } ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
							Project.count( {name: regex, year: req.query.year, color: req.query.color } ).exec(function (err, count) {
								if(err) {
									console.log(err);
								} else {
									if(req.query.search && req.query.year && req.query.color && req.query.views) {
										Project.find( { name: regex, year: req.query.year, color: req.query.color } ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
											Project.count( {name: regex, year: req.query.year, color: req.query.color } ).exec(function (err, count) {
												if(err) {
													console.log(err);
												} else {
													res.render("portfolio/portfolio", {
														projects: allProjects,
														current: page,
														pages: Math.ceil(count / perPage),
														noMatch: noMatch,
														count: count,
														search: req.query.search,
														category: false,
														year: req.query.year,
														views: req.query.views,
														color: req.query.color
													});
												}
											});
										});
									} else {
										res.render("portfolio/portfolio", {
											projects: allProjects,
											current: page,
											pages: Math.ceil(count / perPage),
											noMatch: noMatch,
											count: count,
											search: req.query.search,
											category: false,
											year: req.query.year,
											views: false,
											color: req.query.color
										});
									}
								}
							});
						});
					} else {
						if(req.query.search && req.query.year && req.query.views) {
							Project.find( { name: regex, year: req.query.year } ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
								Project.count( {name: regex, year: req.query.year } ).exec(function (err, count) {
									if(err) {
										console.log(err);
									} else {
										res.render("portfolio/portfolio", {
											projects: allProjects,
											current: page,
											pages: Math.ceil(count / perPage),
											noMatch: noMatch,
											count: count,
											search: req.query.search,
											category: false,
											year: req.query.year,
											views: req.query.views,
											color: false
										});
									}
								});
							});
						} else {
							res.render("portfolio/portfolio", {
								projects: allProjects,
								current: page,
								pages: Math.ceil(count / perPage),
								noMatch: noMatch,
								count: count,
								search: req.query.search,
								category: false,
								year: req.query.year,
								views: false,
								color: false
							});
						}
					}
				}
			});
		});
	} else {
		if(req.query.search && req.query.color) {
			Project.find( { name: regex, color: req.query.color } ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
				Project.count( {name: regex, color: req.query.color } ).exec(function (err, count) {
					if(err) {
						console.log(err);
					} else {
						if(req.query.search && req.query.color && req.query.views) {
							Project.find( { name: regex, color: req.query.color } ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
								Project.count( {name: regex, color: req.query.color } ).exec(function (err, count) {
									if(err) {
										console.log(err);
									} else {
										res.render("portfolio/portfolio", {
											projects: allProjects,
											current: page,
											pages: Math.ceil(count / perPage),
											noMatch: noMatch,
											count: count,
											search: req.query.search,
											category: false,
											year: false,
											views: req.query.views,
											color: req.query.color
										});
									}
								});
							});
						} else {
							res.render("portfolio/portfolio", {
								projects: allProjects,
								current: page,
								pages: Math.ceil(count / perPage),
								noMatch: noMatch,
								count: count,
								search: req.query.search,
								category: false,
								year: false,
								views: false,
								color: req.query.color
							});
						}
					}
				});
			});
		} else {
			if(req.query.search && req.query.views) {
				Project.find( { name: regex } ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
					Project.count( {name: regex } ).exec(function (err, count) {
						if(err) {
							console.log(err);
						} else {
							res.render("portfolio/portfolio", {
								projects: allProjects,
								current: page,
								pages: Math.ceil(count / perPage),
								noMatch: noMatch,
								count: count,
								search: req.query.search,
								category: false,
								year: false,
								views: req.query.views,
								color: false
							});
						}
					});
				});
			} else {
				res.render("portfolio/portfolio", {
					projects: allProjects,
					current: page,
					pages: Math.ceil(count / perPage),
					noMatch: noMatch,
					count: count,
					search: req.query.search,
					category: false,
					year: false,
					views: false,
					color: false
				});
			}
		}
	}
}
}
});
});
} else {
	if(req.query.category) {
		Project.find( {category: req.query.category} ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
			Project.count( {category: req.query.category} ).exec(function (err, count) {
				if(err) {
					console.log(err);
				} else {
					if(req.query.category && req.query.year) {
						Project.find( {category: req.query.category, year: req.query.year} ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
							Project.count( {category: req.query.category, year: req.query.year} ).exec(function (err, count) {
								if(err) {
									console.log(err);
								} else {
									if(req.query.category && req.query.year && req.query.color) {
										Project.find( {category: req.query.category, year: req.query.year, color: req.query.color} ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
											Project.count( {category: req.query.category, year: req.query.year, color: req.query.color} ).exec(function (err, count) {
												if(err) {
													console.log(err);
												} else {
													if(req.query.category && req.query.year && req.query.color && req.query.views) {
														Project.find( {category: req.query.category, year: req.query.year, color: req.query.color} ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
															Project.count( {category: req.query.category, year: req.query.year, color: req.query.color} ).exec(function (err, count) {
																if(err) {
																	console.log(err);
																} else {
																	res.render("portfolio/portfolio", {
																		projects: allProjects,
																		current: page,
																		pages: Math.ceil(count / perPage),
																		noMatch: noMatch,
																		count: count,
																		search: false,
																		category: req.query.category,
																		year: req.query.year,
																		views: req.query.views,
																		color: req.query.color
																	});
																}
															});
														});
													} else {
														res.render("portfolio/portfolio", {
															projects: allProjects,
															current: page,
															pages: Math.ceil(count / perPage),
															noMatch: noMatch,
															count: count,
															search: false,
															category: req.query.category,
															year: req.query.year,
															views: false,
															color: req.query.color
														});
													}
												}
											});
										});
									} else {
										if(req.query.category && req.query.year && req.query.views) {
											Project.find( {category: req.query.category, year: req.query.year} ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
												Project.count( {category: req.query.category, year: req.query.year} ).exec(function (err, count) {
													if(err) {
														console.log(err);
													} else {
														res.render("portfolio/portfolio", {
															projects: allProjects,
															current: page,
															pages: Math.ceil(count / perPage),
															noMatch: noMatch,
															count: count,
															search: false,
															category: req.query.category,
															year: req.query.year,
															views: req.query.views,
															color: false
														});
													}
												});
											});
										} else {
											res.render("portfolio/portfolio", {
												projects: allProjects,
												current: page,
												pages: Math.ceil(count / perPage),
												noMatch: noMatch,
												count: count,
												search: false,
												category: req.query.category,
												year: req.query.year,
												views: false,
												color: false
											});
										}
									}
								}
							});
						});
					} else {
						if(req.query.category && req.query.color) {
							Project.find( {category: req.query.category, color: req.query.color} ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
								Project.count( {category: req.query.category, color: req.query.color} ).exec(function (err, count) {
									if(err){
										console.log(err);
									} else {
										if(req.query.category && req.query.color && req.query.views) {
											Project.find( {category: req.query.category, color: req.query.color} ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
												Project.count( {category: req.query.category, color: req.query.color} ).exec(function (err, count) {
													if(err) {
														console.log(err);
													} else {
														res.render("portfolio/portfolio", {
															projects: allProjects,
															current: page,
															pages: Math.ceil(count / perPage),
															noMatch: noMatch,
															count: count,
															search: false,
															category: req.query.category,
															year: false,
															views: req.query.views,
															color: req.query.color
														});
													}
												});
											});
										} else {
											res.render("portfolio/portfolio", {
												projects: allProjects,
												current: page,
												pages: Math.ceil(count / perPage),
												noMatch: noMatch,
												count: count,
												search: false,
												category: req.query.category,
												year: false,
												views: false,
												color: req.query.color
											});
										}
									}
								});
							});
						} else {
							if(req.query.category && req.query.views) {
								Project.find( {category: req.query.category} ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
									Project.count( {category: req.query.category} ).exec(function (err, count) {
										if(err) {
											console.log(err);
										} else {
											res.render("portfolio/portfolio", {
												projects: allProjects,
												current: page,
												pages: Math.ceil(count / perPage),
												noMatch: noMatch,
												count: count,
												search: false,
												category: req.query.category,
												year: false,
												views: req.query.views,
												color: false
											});
										}
									});
								});
							} else {
								res.render("portfolio/portfolio", {
									projects: allProjects,
									current: page,
									pages: Math.ceil(count / perPage),
									noMatch: noMatch,
									count: count,
									search: false,
									category: req.query.category,
									year: false,
									views: false,
									color: false
								});
							}
						}
					}
				}
			});
});
} else {
	if(req.query.year) {
		Project.find( {year: req.query.year} ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
			Project.count( {year: req.query.year} ).exec(function (err, count) {
				if(err) {
					console.log(err);
				} else {
					if(req.query.year && req.query.color) {
						Project.find( {year: req.query.year, color: req.query.color} ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
							Project.count( {year: req.query.year, color: req.query.color} ).exec(function (err, count) {
								if(err) {
									console.log(err);
								} else {
									if(req.query.year && req.query.color && req.query.views) {
										Project.find( {year: req.query.year, color: req.query.color} ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
											Project.count( {year: req.query.year, color: req.query.color} ).exec(function (err, count) {
												if(err) {
													console.log(err);
												} else {
													res.render("portfolio/portfolio", {
														projects: allProjects,
														current: page,
														pages: Math.ceil(count / perPage),
														noMatch: noMatch,
														count: count,
														search: false,
														category: false,
														year: req.query.year,
														views: req.query.views,
														color: req.query.color
													});
												}
											});
										});
									} else {
										res.render("portfolio/portfolio", {
											projects: allProjects,
											current: page,
											pages: Math.ceil(count / perPage),
											noMatch: noMatch,
											count: count,
											search: false,
											category: false,
											year: req.query.year,
											views: false,
											color: req.query.color
										});
									}
								}
							});
						});
					} else {
						if(req.query.year && req.query.views) {
							Project.find( {year: req.query.year} ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
								Project.count( {year: req.query.year} ).exec(function (err, count) {
									if(err) {
										console.log(err);
									} else {
										res.render("portfolio/portfolio", {
											projects: allProjects,
											current: page,
											pages: Math.ceil(count / perPage),
											noMatch: noMatch,
											count: count,
											search: false,
											category: false,
											year: req.query.year,
											views: req.query.views,
											color: false
										});
									}
								});
							});
						}
						res.render("portfolio/portfolio", {
							projects: allProjects,
							current: page,
							pages: Math.ceil(count / perPage),
							noMatch: noMatch,
							count: count,
							search: false,
							category: false,
							year: req.query.year,
							views: false,
							color: false
						});
					}
				}
			});
		});
	} else {
		if(req.query.color) {
			Project.find( {color: req.query.color} ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
				Project.count( {color: req.query.color} ).exec(function (err, count) {
					if(err) {
						console.log(err);
					} else {
						if(req.query.color && req.query.views) {
							Project.find( {color: req.query.color} ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
								Project.count( {color: req.query.color} ).exec(function (err, count) {
									if(err) {
										console.log(err);
									} else {
										res.render("portfolio/portfolio", {
											projects: allProjects,
											current: page,
											pages: Math.ceil(count / perPage),
											noMatch: noMatch,
											count: count,
											search: false,
											category: false,
											year: false,
											views: req.query.views,
											color: req.query.color
										});
									}
								});
							});
						} else {
							res.render("portfolio/portfolio", {
								projects: allProjects,
								current: page,
								pages: Math.ceil(count / perPage),
								noMatch: noMatch,
								count: count,
								search: false,
								category: false,
								year: false,
								views: false,
								color: req.query.color
							});
						}
					}
				});
			});
		} else {
			if(req.query.views) {
				Project.find( {} ).sort({views: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
					Project.count( {} ).exec(function (err, count) {
						if(err) {
							console.log(err);
						} else {
							res.render("portfolio/portfolio", {
								projects: allProjects,
								current: page,
								pages: Math.ceil(count / perPage),
								noMatch: noMatch,
								count: count,
								search: false,
								category: false,
								year: false,
								views: req.query.views,
								color: false
							});
						}
					});
				});
			}
			else {
				Project.find( {} ).sort({order: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allProjects) {
					Project.count( {} ).exec(function (err, count) {
						if(err) {
							console.log(err);
						} else {
							res.render("portfolio/portfolio", {
								projects: allProjects,
								current: page,
								pages: Math.ceil(count / perPage),
								noMatch: noMatch,
								count: count,
								search: false,
								category: false,
								year: false,
								views: false,
								color: false
							});
						}
					});
				});
			}
		}
	}
}
}
});


// CREATE - add new projects to DB

router.post("/", middleware.isLoggedIn, middleware.isAdmin, function(req, res) {

	//get data from form and add to projects array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var category = req.body.category;
	var date = req.body.date;
	var tech = req.body.tech;
	var order = req.body.order;
	var color = req.body.color;

	var newDate = new Date(date);
	var year = newDate.getYear() + 1900;


	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var techData = ["html", "css", "javascript", "jquery", "nodejs"];
	var colorData = ["red", "green", "blue", "orange", "pink"];

	// console.log("THIS IS TECH-ALL: " + req.body.techAll);
	var newProject = {name: name, image: image, description: description, category: category, date: date, author: author, tech: tech, order: order, year: year, color: color};

	// Create a new project and save to DB
	Project.create(newProject, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			newlyCreated.techAll.push(...techData);
			newlyCreated.save();
			req.flash("success", "Created new project.");
			res.redirect("/portfolio");
		}
	});
});

// NEW - show form to create new project

router.get("/new", middleware.isLoggedIn, middleware.isAdmin, function(req, res) {
	res.render("portfolio/new-project");
});

// SHOW -- show more info about one project

router.get("/:id", function(req, res) {

	// find the project with the provided ID
	Project.findById(req.params.id).populate("comments likes photos").exec(function(err, foundProject){
		if(err || !foundProject) {
			req.flash("error", "Error: Project not found.");
			res.redirect("/portfolio");
		} else {
			Comment.find({}, function(err, foundComment){
				if(err) {
					console.log(err);
				} else {
					Reply.find({}, function(err, foundReply){
						if(err) {
							console.log(err);
						} else {
							Project.aggregate([ { $sample: { size: 10 } } ], function(err, similarProject){
								if(err) {
									console.log(err);
									res.redirect("back");
								} else {

									User.find({}, function(err, foundUsers){
										if(err) {
											console.log(err);
											res.redirect("back");
										} else {
									// Add + 1 to views and saves number of views.
									foundProject.views++;
									foundProject.save();
									res.render("portfolio/show-project", {project: foundProject, comment: foundComment, reply: foundReply, simPro: similarProject, user: foundUsers});
								}
							});
									
								}
							}).limit( 3 );
							
						}
					});
				}
			});
			
		}
	});
});

// EDIT PROJECT ROUTE

router.get("/:id/edit", middleware.checkProjectOwnership, function(req, res) {
	
	Project.findById(req.params.id, function(err, foundProject) {
		
		if(err) {
			req.flash("error", "Something went wrong");
			console.log(err);
		} else {
			res.render("portfolio/edit-project", {project: foundProject});
		}
	});
});


// UPDATE PROJECT ROUTE

router.put("/:id", middleware.checkProjectOwnership, function(req, res) {
	// Find and Update the correct Project
	var newDate = new Date(req.body.project.date);
	var year = newDate.getYear() + 1900;
	req.body.project.year = year;
	Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject) {
		if(err) {
			req.flash("error", "Something went wrong.");
			res.redirect("/portfolio");
		} else {
			// Redirect somewhere (Project Show Page)
			req.flash("success", "Project updated.");
			res.redirect("/portfolio/" + req.params.id);
		}
	});
});

// DESTROY PROJECT ROUTE 

router.delete("/:id", middleware.checkProjectOwnership, function(req, res) {
	Project.findByIdAndRemove(req.params.id, function(err, deletedProject) {
		if(err) {
			req.flash("error", "Something went wrong.");
			res.redirect("/portfolio");
		} else {
			Comment.find({}, function(err, comment){
				if(err) {
					console.log(err);
					res.redirect("back");
				} else {
					comment.forEach(function(commentEach){
						if(commentEach.projectID == deletedProject._id) {
							commentEach.remove();
							Reply.find({}, function(err, reply){
								if(err) {
									console.log(err);
									res.redirect("back");
								} else {
									reply.forEach(function(replyEach){
										if(replyEach.commentID == commentEach._id)
											replyEach.remove();
									});
								}
							});
						}
					});
				}
			});

			Photo.find({}, function(err, photo){
				if(err) {
					console.log(err);
					res.redirect("back");
				} else {
					photo.forEach(function(photoEach){
						if(photoEach.projectID == deletedProject._id) {
							photoEach.remove();
						}
					});
				}
			});

			req.flash("success", "Project deleted.");
			res.redirect("/portfolio");
		}
	});
});


// Project Likes Route

// Project Like Route
router.post("/:id/like", middleware.isLoggedIn, function (req, res) {
	Project.findById(req.params.id, function (err, foundProject) {
		if (err) {
			console.log(err);
			return res.redirect("/portfolio");
		}

		// check if req.user._id exists in foundProject.likes
		var foundUserLike = foundProject.likes.some(function (like) {
			return like.equals(req.user._id);
		});

		if (foundUserLike) {
			// user already liked, removing like
			foundProject.likes.pull(req.user._id);
		} else {
			// adding the new user like
			foundProject.likes.push(req.user);
		}

		foundProject.save(function (err) {
			if (err) {
				console.log(err);
				return res.redirect("/portfolio");
			}
			return res.redirect("/portfolio/" + foundProject._id);
		});
	});
});

function escapeRegex(text) {
	if(text) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	} else {
		return "";
	}
};


module.exports = router;