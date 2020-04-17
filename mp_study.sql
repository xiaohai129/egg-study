/*
Navicat MySQL Data Transfer

Source Server         : xh
Source Server Version : 80019
Source Host           : localhost:3306
Source Database       : mp_study

Target Server Type    : MYSQL
Target Server Version : 80019
File Encoding         : 65001

Date: 2020-04-17 17:27:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `content` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `label` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES ('4', '我很帅', '测试上厕所111111111111', '2019-01-01 01:12:00', '12,1');
INSERT INTO `record` VALUES ('6', '123', '测试上厕所111111111111', '2020-04-16 16:26:25', '12,1');

-- ----------------------------
-- Table structure for record_label
-- ----------------------------
DROP TABLE IF EXISTS `record_label`;
CREATE TABLE `record_label` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(8) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `color` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_info` (`uid`,`name`,`color`),
  CONSTRAINT `key_user_id` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record_label
-- ----------------------------
INSERT INTO `record_label` VALUES ('34', '123', '12', '#ffffff');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `nickname` varchar(16) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `province` varchar(32) DEFAULT NULL,
  `city` varchar(32) DEFAULT NULL,
  `country` varchar(32) DEFAULT NULL,
  `gender` tinyint DEFAULT '0' COMMENT '性别 0：未知、1：男、2：女',
  `password` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('11', null, '123456', 'https://csdnimg.cn/cdn/content-toolbar/csdn-logo_.png?v=20190924.1', null, null, null, '0', null);
INSERT INTO `user` VALUES ('12', null, '123456', 'https://csdnimg.cn/cdn/content-toolbar/csdn-logo_.png?v=20190924.1', null, null, null, '0', null);
INSERT INTO `user` VALUES ('13', null, '123456', 'https://csdnimg.cn/cdn/content-toolbar/csdn-logo_.png?v=20190924.1', null, null, null, '0', null);
INSERT INTO `user` VALUES ('14', '123456', '123456', 'https://csdnimg.cn/cdn/content-toolbar/csdn-logo_.png?v=20190924.1', null, null, null, '0', null);
INSERT INTO `user` VALUES ('26', null, '12', 'https://csdnimg.cn/cdn/content-toolbar/csdn-logo_.png?v=20190924.1', null, null, null, '0', null);
