/*
 Navicat Premium Data Transfer

 Source Server         : testMySQL
 Source Server Type    : MySQL
 Source Server Version : 80038 (8.0.38)
 Source Host           : localhost:3306
 Source Schema         : todolist

 Target Server Type    : MySQL
 Target Server Version : 80038 (8.0.38)
 File Encoding         : 65001

 Date: 14/08/2024 14:52:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for asd
-- ----------------------------
DROP TABLE IF EXISTS `asd`;
CREATE TABLE `asd`  (
  `item` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `data` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `id` int NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of asd
-- ----------------------------

-- ----------------------------
-- Table structure for main
-- ----------------------------
DROP TABLE IF EXISTS `main`;
CREATE TABLE `main`  (
  `item` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `date` datetime NULL DEFAULT NULL,
  `id` int NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of main
-- ----------------------------
INSERT INTO `main` VALUES ('高数作业', '2024-10-06 11:52:34', 2);
INSERT INTO `main` VALUES ('线代作业', '2024-07-02 22:03:25', 3);
INSERT INTO `main` VALUES ('离散作业', '2024-07-02 22:03:25', 4);
INSERT INTO `main` VALUES ('练习', '2024-07-02 22:03:25', 5);
INSERT INTO `main` VALUES ('比赛', '2024-10-06 11:52:34', 6);
INSERT INTO `main` VALUES ('123', '2024-08-02 00:00:00', 0);

-- ----------------------------
-- Table structure for tew
-- ----------------------------
DROP TABLE IF EXISTS `tew`;
CREATE TABLE `tew`  (
  `item` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  `id` int NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tew
-- ----------------------------
INSERT INTO `tew` VALUES ('数学作业', '2024-08-10 00:00:00', 1);
INSERT INTO `tew` VALUES ('做ppt', '2024-08-23 10:52:15', 3);

-- ----------------------------
-- Table structure for userinformation
-- ----------------------------
DROP TABLE IF EXISTS `userinformation`;
CREATE TABLE `userinformation`  (
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinformation
-- ----------------------------
INSERT INTO `userinformation` VALUES ('', '');
INSERT INTO `userinformation` VALUES ('', '');
INSERT INTO `userinformation` VALUES ('', '');
INSERT INTO `userinformation` VALUES ('', '');
INSERT INTO `userinformation` VALUES ('', '');
INSERT INTO `userinformation` VALUES ('tew', '123456');
INSERT INTO `userinformation` VALUES ('asd', '123456');
INSERT INTO `userinformation` VALUES ('', '');
INSERT INTO `userinformation` VALUES ('qwe', '123456');
INSERT INTO `userinformation` VALUES ('wer', '123456');
INSERT INTO `userinformation` VALUES ('qwe1', '123456');

SET FOREIGN_KEY_CHECKS = 1;
