//
//  ViewController.swift
//  MoneyMe
//
//  Created by aditya chavan on 31/03/19.
//  Copyright © 2019 Aditya Chavan. All rights reserved.
//

import UIKit
import WebKit
class ViewController: UIViewController {
    let urlMy = URL(string: "http://192.168.7.197:8000/Money/showapi");
    @IBOutlet var mWebKit: WKWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let request = URLRequest(url: urlMy!)
        mWebKit.load(request)
    }


}

