import 'dart:convert';

import 'package:amazon_clone/common/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:http/http.dart' as http;

void httpErrorHandler({
  required http.Response res,
  required BuildContext context,
  required VoidCallback onSuccess,
}) {
  switch (res.statusCode) {
    case 200:
      onSuccess();
      break;
    case 400:
      showSnackBar(context, jsonDecode(res.body)['msg']);
      break;
    case 500:
      showSnackBar(
        context,
        jsonDecode(res.body)['error'],
      );
      break;
    default:
      showSnackBar(context, jsonDecode(res.body));
  }
}
